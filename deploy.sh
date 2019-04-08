# Build to /dist for production
rm -rf dist && yarn build

# Deploy /dist to gh-pages branch
git add dist && git commit -m "deploy new version"
git subtree push --prefix dist origin gh-pages