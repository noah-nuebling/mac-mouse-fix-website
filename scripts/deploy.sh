#!/usr/bin/env sh

# Copied from MMF Feedback Assistant and copied that from From Vue deployment tutorial

# Abort on errors
set -e

# Build static
pnpm generate

# Navigate into the build output directory
cd .output/public

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:noah-nuebling/mac-mouse-fix-website-nuxt.git master:gh-pages

cd -