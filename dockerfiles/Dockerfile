FROM node:14.4-alpine

RUN mkdir -p home/app
WORKDIR /home/app

COPY ./temp ./

ARG NPM_CREDENTIALS
ENV NPM_CREDENTIALS=$NPM_CREDENTIALS

RUN ./create-npmrc.sh $NPM_CREDENTIALS

RUN yarn bootstrap

COPY ./packages ./packages

ARG BUILD_ENV
ENV BUILD_ENV=$BUILD_ENV

# -- CLIENT --
ENV SKIP_PREFLIGHT_CHECK=true

ENV REACT_APP_API_URL=/api
ENV REACT_APP_WS_URL=/
#ENV PORT=4000
#ENV NODE_ENV=production
ENV REACT_APP_CONTENT_URL=

RUN yarn build:prod

CMD yarn run:prod

EXPOSE 9000
