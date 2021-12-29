ARG NODE_ENV=production
ARG NODE_PORT=9000

# =========
# node-base
# =========
FROM node:14.17-slim AS node-base

ARG NODE_ENV
ARG NODE_PORT

ARG HTTP_PROXY
ARG HTTPS_PROXY

ARG NPM_ACCESS_TOKEN

ENV NODE_ENV=$NODE_ENV
ENV NODE_PORT=$NODE_PORT

ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY

ENV NPM_ACCESS_TOKEN=$NPM_ACCESS_TOKEN

RUN apt-get update \
    && apt-get install --yes --no-install-recommends \
        dos2unix \
        tree \
    && rm -rf /var/lib/apt/lists/*

COPY --chmod=0755 ./scripts/create-npmrc.sh /root/create-npmrc.sh

RUN --mount=type=cache,id=yarn_cache,target=/usr/local/share/.cache/yarn \
    dos2unix /root/create-npmrc.sh \
    && bash /root/create-npmrc.sh --token $NPM_ACCESS_TOKEN \ 
    && rm /root/create-npmrc.sh \
    && yarn config set "strict-ssl" false -g \
    && yarn global add lerna@3.22.1 --prefix=/usr 


# ==============
# codebase stage 
# ==============
FROM node-base AS codebase

WORKDIR /opt/src/

COPY --chmod=0644 ./codebase/yarn.lock ./codebase/lerna.json ./codebase/.npmrc ../bootstrap/
COPY --chmod=0644 ./codebase ./

# copying monorepo directory structure, only folders with package.json file
RUN find . -type d -name node_modules -prune -o -name 'package.json' -exec bash -c 'mkdir -p ../bootstrap/$(dirname {})' \; \
    && find . -type d -name node_modules -prune -o -name 'package*.json' -exec cp -r '{}' '../bootstrap/{}' \;

# print filesystem usage info
RUN df -h


# ===========
# build stage
# ===========
FROM node-base AS build

ARG NODE_ENV
ARG NODE_PORT

ARG HTTP_PROXY
ARG HTTPS_PROXY

ARG NPM_ACCESS_TOKEN

ARG PUBLIC_URL=/
ARG REACT_APP_API_URL=/api
ARG REACT_APP_WS_URL=/socket.io
ARG REACT_APP_LOGOUT_URL=/sso/logout
ARG REACT_APP_OURTESCO_URL
ARG REACT_APP_RECITE_ME_SERVICE_KEY
ARG REACT_APP_CONTACT_API_ENABLED=false

ENV NODE_ENV=$NODE_ENV
ENV NODE_PORT=$NODE_PORT
ENV BUILD_ENV=production

ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY

ENV NPM_ACCESS_TOKEN=$NPM_ACCESS_TOKEN

WORKDIR /opt/app

COPY --from=codebase /opt/bootstrap/ ./
COPY --from=codebase /opt/src/ ./

ENV PUBLIC_URL=$PUBLIC_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_WS_URL=$REACT_APP_WS_URL
ENV REACT_APP_LOGOUT_URL=$REACT_APP_LOGOUT_URL
ENV REACT_APP_OURTESCO_URL=$REACT_APP_OURTESCO_URL
ENV REACT_APP_RECITE_ME_SERVICE_KEY=$REACT_APP_RECITE_ME_SERVICE_KEY
ENV REACT_APP_CONTACT_API_ENABLED=$REACT_APP_CONTACT_API_ENABLED

ENV SKIP_PREFLIGHT_CHECK=true

RUN --mount=type=cache,id=yarn_cache,target=/usr/local/share/.cache/yarn \
    --mount=type=cache,id=node_modules,target=/opt/app/node_modules \
    yarn bootstrap:dev \ 
    && yarn build:prod \
    && find . -type d -name node_modules -prune -o -name 'build' -exec bash -c 'mkdir -p ../build/$(dirname {})' \; \
    && find . -type d -name node_modules -prune -o -name 'public' -exec cp -r '{}' '../build/{}' \; \
    && find . -type d -name node_modules -prune -o -name 'build' -exec cp -r '{}' '../build/{}' \;


# ==========
# main stage
# ==========
FROM node-base

ARG NODE_ENV
ARG NODE_PORT

ARG HTTP_PROXY
ARG HTTPS_PROXY

ARG NPM_ACCESS_TOKEN

ENV NODE_ENV=$NODE_ENV
ENV NODE_PORT=$NODE_PORT
ENV BUILD_ENV=production

ENV HTTP_PROXY=$HTTP_PROXY
ENV HTTPS_PROXY=$HTTPS_PROXY

ENV NPM_ACCESS_TOKEN=$NPM_ACCESS_TOKEN

WORKDIR /home/app

COPY --chmod=0755 ./scripts/run.sh ./
COPY --from=codebase /opt/bootstrap/ ./
COPY --from=build /opt/build/ ./

RUN --mount=type=cache,id=yarn_cache,target=/usr/local/share/.cache/yarn \
    find . -type d -name node_modules -prune -o -name 'package.prod.json' -exec bash -c 'mv {} $(dirname {})/package.json' \; \
    && yarn bootstrap:prod \
    && dos2unix ./run.sh
#    && yarn cache clean --all

# These ENV variable must be set to run app:
ENV USE_ONELOGIN=true 
ENV TYPEORM_TYPE=postgres
ENV TYPEORM_SYNCHRONIZE=false
ENV TYPEORM_LOGGING=false

CMD ./run.sh

EXPOSE $NODE_PORT
