NPM_CREDENTIALS=$1

if [ "$NPM_CREDENTIALS" = "--token" ]; then
  NPM_ACCESS_TOKEN=$2
else
  NPM_ACCESS_TOKEN=$(echo -n "$NPM_CREDENTIALS" | base64)
fi

if [ -f ~/.npmrc ]; then
  mv ~/.npmrc ~/copy.npmrc
fi

echo registry=https://registry.npmjs.org/ >> ~/.npmrc
echo //nexus.ourtesco.com/repository/colleague-ui/:_auth=$NPM_ACCESS_TOKEN >> ~/.npmrc
echo //nexus.ourtesco.com/repository/colleague-ui-private/:_auth=$NPM_ACCESS_TOKEN >> ~/.npmrc
echo //nexus.ourtesco.com/repository/online-web-group/:_auth=$NPM_ACCESS_TOKEN >> ~/.npmrc
