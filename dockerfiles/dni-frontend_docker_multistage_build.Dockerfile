FROM node:14.4-alpine as build

# Ourtesco NEXUS repository access token
ARG NEXUS_ACCESS_TOKEN

# Node build time variable
ARG BUILD_ENV_PARAM=production

WORKDIR /home/app

RUN apk --update add bash && apk --no-cache add dos2unix

COPY ./codebase ./
COPY ./scripts/create-npmrc.sh ./create-npmrc.sh

ENV NEXUS_ACCESS_TOKEN=$NEXUS_ACCESS_TOKEN

RUN dos2unix ./create-npmrc.sh && bash ./create-npmrc.sh --token $NEXUS_ACCESS_TOKEN

RUN yarn bootstrap

ENV BUILD_ENV_PARAM=$BUILD_ENV_PARAM

ENV SKIP_PREFLIGHT_CHECK=true
ENV REACT_APP_API_URL=/api 
ENV REACT_APP_WS_URL=/

RUN yarn build:prod

FROM node:14.4-alpine

WORKDIR /app

COPY --from=build /root/.npmrc /root/.npmrc
COPY --from=build /home/app/package.min.json ./package.json
COPY --from=build /home/app/lerna.json /home/app/tsconfig.json /home/app/.npmrc ./

RUN yarn bootstrap

COPY --from=build /home/app/packages/client/build /app/packages/client/build

COPY --from=build /home/app/packages/server/build /app/packages/server/build
COPY --from=build /home/app/packages/server/package.min.json /app/packages/server/package.json

COPY --from=build /home/app/packages/database /app/packages/database

# ==========================================
# These ENV variable must be set to run app:
# ==========================================
#   TYPEORM_TYPE = postgres
#   TYPEORM_HOST = localhost
#   TYPEORM_USERNAME = admin
#   TYPEORM_PASSWORD = qwerty
#   TYPEORM_DATABASE = dni
#   TYPEORM_PORT = 5432
#   TYPEORM_SYNCHRONIZE = false
#   TYPEORM_LOGGING = false

COPY ./scripts/run.sh ./run.sh

#ENTRYPOINT [ "yarn", "run:prod" ]
CMD ./run.sh

EXPOSE 9000
