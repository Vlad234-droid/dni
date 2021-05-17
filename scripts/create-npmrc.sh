NPM_CREDENTIALS=$1

NPM_ACCESS_TOKEN=$(echo -n "$NPM_CREDENTIALS" | base64)

if [ -f ~/.npmrc ]; then
  mv ~/.npmrc ~/copy.npmrc
fi

echo registry=https://registry.npmjs.org/ >> ~/.npmrc
echo //nexus.ourtesco.com/repository/colleague-ui/:_auth=$NPM_ACCESS_TOKEN >> ~/.npmrc
echo //nexus.ourtesco.com/repository/colleague-ui-private/:_auth=$NPM_ACCESS_TOKEN >> ~/.npmrc
echo //nexus.ourtesco.com/repository/online-web-group/:_auth=$NPM_ACCESS_TOKEN >> ~/.npmrc
