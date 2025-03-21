
// This script copies the licenseinfo folder from the assets folder to the public folder.
// Discussion:
//  - Why do we do this? 
//      The contents of the public folder will be served at the root of the website. Making the licenseConfig accessible at noah-nuebling.github.io/mac-mouse-fix-website/licenseinfo/config.json. This is the URL where the MMF app expects to find the licenseconfig.
//      However the contents of the public folder can't be imported inside vue components due to issues with nuxt3. So we also need the licenseinfo folder in the assets folder.
//  - We call this script manually inside our package.json scripts (the ones called with pnpm xxxx) - before the package.json scripts invoke the nuxt build process. This isn't super pretty, but we tried tons of different things for hours and everything was buggy and terrible. So I'm just glad that this works.
//  - Alternative solutions:
//    - 1. Using a post-build script to copy from assets to public -> The files added after build aren't served. See https://github.com/nuxt/nuxt/issues/15779
//    - 2. Using vite-plugin-static-copy to copy from assets to public -> Doesn't seem to work with SSG. See https://github.com/sapphi-red/vite-plugin-static-copy/discussions/68
//    - 3. Using nuxt3's useFetch() to access public folder from vue components -> Is buggy. With possible workarounds. See https://github.com/nuxt/nuxt/issues/13857.
//    - 4. Using custom server routing to make licenseconfig appear at the server root -> This might work well. I didn't test it. See https://github.com/nuxt/nuxt/issues/15779
//
//  Note: .cjs instead of .js file ext is necessary to makre require() work (not sure why) (Update, you can use .mjs to make import work)

// Imports
const fs = require('fs');
const path = require('path');

// Define the source and destination directories
const srcDir = path.join(__dirname, '../assets/licenseinfo');
const destDir = path.join(__dirname, '../public/licenseinfo');

// Function to copy all files from the source to the destination directory
function copyFiles(src, dest) {
  // Create the destination directory if it doesn't exist
  fs.mkdirSync(dest, { recursive: true });

  // Get all the files in the source directory
  const files = fs.readdirSync(src);

  for (const file of files) {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    fs.copyFileSync(srcFile, destFile);
  }

  // Add a note to the destination directory
  fs.writeFileSync(path.join(dest, 'AUTOGENERATED_DO_NOT_EDIT.txt'), 'This folder is autogenerated and should not be edited manually. See scripts/public/copy-licenseinfo.cjs for more info.');
}

// Call the function to copy the files
copyFiles(srcDir, destDir);