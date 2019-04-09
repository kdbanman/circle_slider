# Build to /dist for production
rm -rf dist && yarn build

# Deploy /dist to gh-pages branch
git add dist && git commit -m "deploy new version"
git push origin `git subtree split --prefix dist master`:gh-pages --force