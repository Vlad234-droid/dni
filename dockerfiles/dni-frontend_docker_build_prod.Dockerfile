FROM node:14.4-alpine

# Ourtesco NEXUS repository access token
ARG NEXUS_ACCESS_TOKEN
ARG NODE_ENV

ARG REACT_APP_API_URL=/api
ARG REACT_APP_WS_URL=/socket.io
ARG PUBLIC_URL=/

WORKDIR /home/app

RUN apk --update add bash && apk --no-cache add dos2unix

COPY --chmod=0644 ./codebase ./
COPY --chmod=0755 ./scripts/create-npmrc.sh ./create-npmrc.sh
COPY --chmod=0755 ./scripts/run.sh ./run.sh

ENV NEXUS_ACCESS_TOKEN=$NEXUS_ACCESS_TOKEN

RUN dos2unix ./run.sh && dos2unix ./create-npmrc.sh && bash ./create-npmrc.sh --token $NEXUS_ACCESS_TOKEN

# Explicitly set env to development to install all dependencies
ENV NODE_ENV=development

# Install lerna, versio 3.22.1 globally
RUN yarn global add lerna@3.22.1 --prefix=/usr

RUN which lerna
RUN lerna --version

RUN yarn bootstrap

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_WS_URL=$REACT_APP_WS_URL
ENV PUBLIC_URL=$PUBLIC_URL

ENV SKIP_PREFLIGHT_CHECK=true

ENV BUILD_ENV=production
ENV NODE_ENV=production

RUN yarn build:prod

# ==========================================
# These ENV variable must be set to run app:
# ==========================================

# By default turn on SSO
ENV WITH_ONE_LOGIN=true

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

#ENTRYPOINT [ "yarn", "run:prod" ]
CMD ./run.sh

EXPOSE 9000
