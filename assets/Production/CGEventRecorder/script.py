import sys
import base64
import time # Time is inaccurate using c and objc apis instead.
import json
import os
import objc
import zlib
from Quartz import CGEventTapCreate, CGEventTapEnable, kCGSessionEventTap, kCGHIDEventTap, kCGHeadInsertEventTap, kCGEventTapOptionDefault, CGEventGetIntegerValueField, kCGKeyboardEventKeycode
from Quartz import CGEventCreateFromData, CGEventCreateData, kCGEventNull, CFMachPortCreateRunLoopSource, CFRunLoopAddSource, CFRunLoopRun, CFRunLoopStop, CFRunLoopGetCurrent, CGEventPost
from Quartz.CoreGraphics import kCGEventKeyDown, kCGEventKeyUp, kCGEventMaskForAllEvents
from CoreFoundation import kCFRunLoopCommonModes
from AppKit import NSEvent, NSThread
from Quartz import CACurrentMediaTime

import ctypes
libc = ctypes.CDLL('libc.dylib')

kVK_Delete = 51 # pyobjc doesn't let you import from carbon
kVK_Escape = 53

# Define the event mask for recording
eventMask = kCGEventMaskForAllEvents # (1 << kCGEventKeyDown) | (1 << kCGEventKeyUp)

# Define the event mask for playback 
playbackEventMask = eventMask

# Define the eventTap location
tapLocation = kCGHIDEventTap

def record_events(output_file, verbose):
  
    def callback(proxy, type, event, refcon):
      
        if type == kCGEventKeyDown and CGEventGetIntegerValueField(event, kCGKeyboardEventKeycode) == kVK_Escape:
            CFRunLoopStop(CFRunLoopGetCurrent())
          
        elif type != kCGEventNull:
            timestamp = CACurrentMediaTime()
            event_data = CGEventCreateData(None, event)
            encoded_data = base64.b64encode(event_data.bytes().tobytes()).decode('utf-8')
            data = {
                'event': encoded_data,
                'timestamp': timestamp,
                'type': type
            }
            recorded_events.append(data)
            if verbose:
                print(f"Recorded event: { NSEvent.eventWithCGEvent_(event).description() }")
                
        return event

    print("Recording started. Press esc to stop.")
    recorded_events = []
    event_tap = CGEventTapCreate(tapLocation, kCGHeadInsertEventTap, kCGEventTapOptionDefault, eventMask, callback, None)
    if not event_tap:
        print("Failed to create event tap")
        sys.exit(1)

    run_loop_source = CFMachPortCreateRunLoopSource(None, event_tap, 0)
    CFRunLoopAddSource(CFRunLoopGetCurrent(), run_loop_source, kCFRunLoopCommonModes)
    CGEventTapEnable(event_tap, True)

    # Run the runloop until it is stopped
    CFRunLoopRun()
    
    # Write to file
    print("Writing events to file...")
    with open(output_file, 'wb') as f:
        compressed_data = compress_events(recorded_events)
        f.write(compressed_data)

def playback_events(input_file, verbose, start_time=0, end_time=None):
    
    with open(input_file, 'rb') as f:
        compressed_data = f.read()
        events = expand_events(compressed_data)

    first_ts = events[0]["timestamp"]
    last_ts = events[-1]["timestamp"]
    first_time = 0
    last_time = last_ts - first_ts
    
    if end_time is None:
        end_time = last_time
    
    start_index = -1
    end_index = -1
    
    for i, e in enumerate(events):
        t = e["timestamp"] - first_ts
        if start_index == -1 and t >= start_time:
            start_index = i
        if end_index == -1 and t >= end_time:
            end_index = i
        if start_index != -1 and end_index != -1:
            break
    
    if start_index == -1 or end_index == -1:
        print(f"Invalid start or end time. Time range: (0, {last_ts - first_ts})")
        return
    
    if start_index >= end_index:
        print("Invalid start and end times. They are too close together or the start time is past the end time")
        return
            
    progress = start_time/(last_time - first_time)
            
    last_progress_update_time = start_time
    last_progress_update_progress = progress
    
    playback_start_ts = None
    
    for i in range(start_index, end_index+1):
        
        event = events[i]
        
        # Skip events not in mask
        skip_event = not (event['type'] & playbackEventMask)
        if skip_event: 
            continue
        
        # Determine playback phase
        is_playback_start = i == start_index
        is_playback_end = i == end_index
        is_playback_continue = not is_playback_start and not is_playback_end
        
        # Gather data
        time = event["timestamp"] - first_ts
        progress = time/(last_time - first_time)
        decoded_event_data = base64.b64decode(event['event'])
        cg_event = CGEventCreateFromData(None, decoded_event_data)

        # Sleep
        current_ts = CACurrentMediaTime()
        if playback_start_ts is None:
            playback_start_ts = current_ts

        target_ts = playback_start_ts + (time - start_time)
        delay = target_ts - current_ts
        if delay > 0:
            accurate_sleep(delay)
                
        # Send event
        CGEventPost(tapLocation, cg_event)                     
        
        # Print progress update            
        time_step_exceeded = time - last_progress_update_time >= 1
        progress_step_exceeded = progress - last_progress_update_progress >= 0.1
                    
        if is_playback_start or is_playback_end or time_step_exceeded or progress_step_exceeded:
            print(f"Playback progress: {time:.2f}s ({progress*100:.0f}%)")
            last_progress_update_time = time
            last_progress_update_progress = progress

        if verbose:
            print(f"Simulating event {i+1}/{len(events)} - {time:.5f}s - {progress*100:.2f}% complete --- { NSEvent.eventWithCGEvent_(cg_event).description() }")
    
    print("Finished playback.")

def accurate_sleep(seconds):
    
    # Not sure there's a difference between these
    
    # libc.usleep(int(seconds * 1_000_000)) 
    NSThread.sleepForTimeInterval_(seconds)
    # time.sleep(seconds)

def set_nice(nice_value): 
    # Set the process priority as a value between -20 (highest priority) and 19 (lowest priority), to get optimal playback quality.
    #   Not sure if this works or makes any sense as we use it. Also, we are overengineering this script.
    libc = ctypes.CDLL("libc.dylib")
    libc.setpriority(0, os.getpid(), nice_value)

def compress_events(events):
    data = json.dumps(events).encode('utf-8')
    return zlib.compress(data)

def expand_events(compressed_data):
    data = zlib.decompress(compressed_data)
    return json.loads(data.decode('utf-8'))

if __name__ == "__main__":
    
    mode = sys.argv[1]
    verbose = '--verbose' in sys.argv
    if verbose: sys.argv.remove('--verbose')

    if mode == "record":
        set_nice(-15)
        output_file = sys.argv[2]
        record_events(output_file, verbose)
    elif mode == "playback":
        set_nice(15)
        input_file = sys.argv[2]
        start_time = float(sys.argv[3]) if len(sys.argv) > 3 else 0
        end_time = float(sys.argv[4]) if len(sys.argv) > 4 else None
        playback_events(input_file, verbose, start_time, end_time)
    else:
        print("Invalid mode. Use 'record' or 'playback'.")