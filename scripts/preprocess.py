"""

This script is run before compiling the project.

  Note:
  - We used to have this be in javascript (.mjs) but that didn't print the prints of the scripts it invoked? I'm just more familiar with python.

"""


import subprocess

def main():
  
  # Compile .xcstrings to .js  
  print("Calling mmf-website-compile-strings script ...")
  subprocess.run('python3 ./mac-mouse-fix-scripts/run.py mmf-website_build-strings --output_path locales/Localizable.js', text=True, shell=True)
  
  # Move licenseinfo to ./public folder
  print("Calling copy-licenseinfo script ...")
  subprocess.run('node ./scripts/copy-licenseinfo.cjs', text=True, shell=True)
  
  print('\nFinished preprocessing.\n')
  

if __name__ == '__main__':
  main()