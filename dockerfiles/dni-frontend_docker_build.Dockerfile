FROM node:14.7-slim

ARG NODE_ENV
ARG HTTP_PROXY
ARG HTTPS_PROXY

# Ourtesco NEXUS repository access token
ARG NEXUS_ACCESS_TOKEN

ARG PUBLIC_URL=/

ARG REACT_APP_API_URL=/api
ARG REACT_APP_WS_URL=/socket.io
ARG REACT_APP_LOGOUT_URL=/sso/logout
ARG REACT_APP_OURTESCO_URL
ARG REACT_APP_RECITE_ME_SERVICE_KEY
ARG REACT_APP_CONTACT_API_ENABLED=false

WORKDIR /home/app

RUN apt-get update \
    && apt-get install --yes --no-install-recommends \
        dos2unix \
        gcc make libc-dev python g++ \
    && rm -rf /var/lib/apt/lists/*

COPY --chmod=0644 ./codebase ./
COPY --chmod=0755 ./scripts/create-npmrc.sh ./create-npmrc.sh
COPY --chmod=0755 ./scripts/run.sh ./run.sh

ENV NEXUS_ACCESS_TOKEN=$NEXUS_ACCESS_TOKEN

RUN dos2unix ./run.sh && dos2unix ./create-npmrc.sh && bash ./create-npmrc.sh --token $NEXUS_ACCESS_TOKEN

# Show information about the file system
RUN df -h

RUN yarn config set "strict-ssl" false -g

# Install lerna, version 3.22.1 globally
RUN yarn global add lerna@3.22.1 --prefix=/usr

RUN which lerna
RUN lerna --version

#RUN yarn global add sqlite3@5.0.0 --prefix=/usr

ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY

RUN yarn bootstrap

ENV BUILD_ENV=production

ENV NODE_ENV=$NODE_ENV
ENV PUBLIC_URL=$PUBLIC_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_WS_URL=$REACT_APP_WS_URL
ENV REACT_APP_LOGOUT_URL=$REACT_APP_LOGOUT_URL
ENV REACT_APP_OURTESCO_URL=$REACT_APP_OURTESCO_URL

ENV REACT_APP_RECITE_ME_SERVICE_KEY=$REACT_APP_RECITE_ME_SERVICE_KEY
ENV REACT_APP_CONTACT_API_ENABLED=$REACT_APP_CONTACT_API_ENABLED

ENV SKIP_PREFLIGHT_CHECK=true

RUN yarn build:prod

# ==========================================
# These ENV variable must be set to run app:
# ==========================================
# By default turn on SSO
ENV USE_ONELOGIN=true

# Mock server (must not be empty)
ENV MOCK_SERVER_URL=<none>

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
