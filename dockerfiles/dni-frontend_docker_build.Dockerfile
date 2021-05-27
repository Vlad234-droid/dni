FROM node:14.4-alpine

# Ourtesco NEXUS repository access token
ARG NEXUS_ACCESS_TOKEN
ARG NODE_ENV
ARG APPLICATION_PATH

WORKDIR /home/app

RUN apk --update add bash && apk --no-cache add dos2unix

COPY --chmod=0644 ./codebase ./
COPY --chmod=0755 ./scripts/create-npmrc.sh ./create-npmrc.sh
COPY --chmod=0755 ./scripts/run.sh ./run.sh

ENV NEXUS_ACCESS_TOKEN=$NEXUS_ACCESS_TOKEN

RUN dos2unix ./create-npmrc.sh && bash ./create-npmrc.sh --token $NEXUS_ACCESS_TOKEN

RUN yarn bootstrap

ENV BUILD_ENV_PARAM=production

ENV NODE_ENV=$NODE_ENV
ENV APPLICATION_PATH=$APPLICATION_PATH
ENV PUBLIC_URL=$APPLICATION_PATH

ENV SKIP_PREFLIGHT_CHECK=true
ENV REACT_APP_API_URL=/api 
ENV REACT_APP_WS_URL=/

RUN yarn build:prod

# ==========================================
# These ENV variable must be set to run app:
# ==========================================
# Mock server (must not be empty)
ENV MOCK_SERVER_URL=<none>

# Confirmit
ENV CONFIRMIT_PASSWORD=<none>

ENV TYPEORM_TYPE=postgres
#   TYPEORM_HOST = localhost
#   TYPEORM_USERNAME = admin
#   TYPEORM_PASSWORD = qwerty
#   TYPEORM_DATABASE = dni
#   TYPEORM_PORT = 5432
ENV TYPEORM_SYNCHRONIZE=false
ENV TYPEORM_LOGGING=false

#   WITH_ONE_LOGIN
#   COOKIE_USER_KEY

#ENTRYPOINT [ "yarn", "run:prod" ]
CMD ./run.sh

EXPOSE 9000
