# CGEvent Recorder and Player

This is designed and implemented by ChatGPT. Very smart boi.

This Python script allows for recording and playback of macOS system events using Quartz Event Services. We already have eventLoggerForBrad and the TouchRecorder in the TouchEventReverseEngineering repo. But why not let ChatGPT write a more streamlined, easy to use solution optimal for producing product demo videos.

## Requirements

- Python 3

## Setup

1. **Create a Virtual Environment**:

  ```bash
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  ```

## Usage

### Recording Mode


  ```bash
  python3 script.py record output_file [--verbose]
  ```
  - Add the `--verbose` flag to print each recorded event type.

### Playback Mode

#### Playback Events:

  ```bash
  python3 script.py playback input_file [start_time] [end_time] [--verbose]
  ```
  - Use the `--verbose` flag to print each event type being played back.

### Notes

- Ensure that your terminal or IDE has the necessary accessibility permissions on macOS to create an event tap.
   
### Update 

- [Oct 2025] IIRC I planned to record input of the video-demos so I can easily update them for future macOS versions. But I didn't end up using this, because I ended up just made a veryyy long recording and then cut out the 'good' bits using Davinci Resolve – The workflow that I was imagining didn't really work out.