mkdir temp

cp -v package.json yarn.lock lerna.json tsconfig.json .eslintrc.js .npmrc temp/
cp -v ./scripts/create-npmrc.sh temp/
find ./packages -name 'package.json' -exec sh -c 'cd ./temp && mkdir -p "${0%/*}" &&  cp -v "../$0" "${0}"' {} \; 

IMAGE_NAME=$1
BUILD_ENV_PARAM=$2

docker build \
  --tag $IMAGE_NAME \
  --build-arg BUILD_ENV_PARAM=$BUILD_ENV_PARAM \
  --build-arg NPM_CREDENTIALS=$NPM_CREDENTIALS \
  --build-arg WITH_ONE_LOGIN=$WITH_ONE_LOGIN \
  --build-arg OIDC_CLIENT_ID=$OIDC_CLIENT_ID \
  --build-arg OIDC_CLIENT_SECRET=$OIDC_CLIENT_SECRET \
  --build-arg IDENTITY_CLIENT_ID=$IDENTITY_CLIENT_ID \
  --build-arg IDENTITY_CLIENT_SECRET=$IDENTITY_CLIENT_SECRET \
  --build-arg WEB_HOOKS_SECRET=$WEB_HOOKS_SECRET \
  --build-arg POSTGRES_HOST=$POSTGRES_HOST \
  --build-arg POSTGRES_PORT=$POSTGRES_PORT \
  --build-arg POSTGRES_DB=$POSTGRES_DB \
  --build-arg POSTGRES_USER=$POSTGRES_USER \
  --build-arg POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  --file dockerfiles/Dockerfile \
  .;

rm -rf temp