mkdir temp

cp -v package.json yarn.lock lerna.json tsconfig.json .eslintrc.js temp/
find ./packages -name 'package.json' -exec sh -c 'cd ./temp && mkdir -p "${0%/*}" &&  cp -v "../$0" "${0}"' {} \; 

IMAGE_NAME=$1
BUILD_ENV_PARAM=$2

docker build \
  --tag $IMAGE_NAME \
  --build-arg BUILD_ENV_PARAM=$BUILD_ENV_PARAM \
  .;

rm -rf temp
