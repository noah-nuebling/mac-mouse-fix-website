# Readme - `public` directory

- Contents of the `public` directory are copied to the website root as is. They are not processed by nuxt and stuff. 
- This directory contains lots of stuff copied over from the old mmf website, to keep compatibility. Such as:
  - The thankyou page which can be accessed at `/thankyou`. The update files for the prefpane version of mmf (0.9.x) - found inside `/maindownload`. The update files for the early app versions of mmf (1.x) - found inside `/maindownload-app`. Script and source files for generating update notes for these old versions of mmf - found inside `/updatenotes-source`. The `updatenotes-source/install` script might not work anymore since it might expect paths and stuff that only existed on the old website.
  - `/activate` opens MMF3 on the activate license screen
  - `/licenseinfo` is used by MMF3 to determine which countries are free, which price to display, how many free days there are, etc. 
  - `CNAME`, `robots.txt`, `sitemap.xml` are standard web stuff
  - `favicon.ico` is the favicon (by default)
  - `.nojekyll` is necessary so github pages works normally
  - One thing we didn't copy over from the old website is the `/help` page - it used to house a tutorial for a workaround for problems with installing the prefpane, but recently it only linked to the github discussions. So we left it out. 