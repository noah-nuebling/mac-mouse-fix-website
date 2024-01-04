#!/usr/bin/env sh

# Notes:
# - This is copied and adapted from MMF Feedback Assistant which itself was copied from Vue deployment tutorial

# Abort on errors
set -e

# Build static
pnpm generate

# Navigate into the build output directory
cd .output/public

git init
git add -A
git commit -m 'deploy'

# Upload to gh-pages branch
git push -f git@github.com:noah-nuebling/mac-mouse-fix-website-nuxt.git HEAD:gh-pages

cd -