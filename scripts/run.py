
"""
 This script lets us use the python scripts that are in the mac-mouse-fix repo.
   (The mac-mouse-fix repo is expected to be at ./../mac-mouse-fix/ relative to this repo.)

This lets us tap into all the nice python utility functions which we already wrote inside the mac-mouse-fix repo.
We might also write .py scripts specifically for this website, but still put them into the mac-mouse-fix repo.
"""

#
# Imports
#

# Note: Only import stdlib stuff (not pip packages) to keep this script portable and dependency-free. 

import subprocess
import os
import sys

#
# Constants
# 

mmf_repo_path = '../mac-mouse-fix/'
mmf_repo_run_subpath = './Scripts/run.py'
mmf_to_website_repo_path = '../mac-mouse-fix-website/'

#
# main
#
def main():
  
  # Prepare args
  args = sys.argv[1:]
  args += ['--target_repo', mmf_to_website_repo_path]
  
  # Change workding dir
  os.chdir(mmf_repo_path)
  
  # Call run.py
  subprocess.run(['python3', mmf_repo_run_subpath, *args]) # Idk whether to use subprocess.run or .check_call, or something else, and whether to handle the return here
  
#
# Call main
#
if __name__ == '__main__':
  main()