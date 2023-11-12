#!/usr/bin/env sh

# Test the production build. Copied from deploy.sh with some changes.

# Abort on errors
set -e

# Build static
pnpm generate

# Navigate into the build output directory
cd .output/public

# Enable `!(pattern)` syntax
shopt -s extglob

# Move everything into subfolder
mkdir mac-mouse-fix-website-nuxt
mv !(mac-mouse-fix-website-nuxt) mac-mouse-fix-website-nuxt/

# Serve
pnpm preview