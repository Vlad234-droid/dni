mkdir temp

cp -v ./codebase/package.json ./codebase/yarn.lock ./codebase/lerna.json ./codebase/tsconfig.json ./codebase/.eslintrc.js ./codebase/.npmrc temp/
cp -v ./scripts/create-npmrc.sh temp/
find ./codebase/packages -name 'package.json' -exec sh -c 'cd ./temp && mkdir -p "${0%/*}" &&  cp -v "../$0" "${0}"' {} \; 

IMAGE_NAME=$1
BUILD_ENV=$2

docker build \
  --tag $IMAGE_NAME \
  --build-arg BUILD_ENV=$BUILD_ENV \
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