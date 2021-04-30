FROM node:14.4-alpine

RUN mkdir -p home/app
WORKDIR /home/app

COPY ./temp ./

ARG NPM_CREDENTIALS
ENV NPM_CREDENTIALS=$NPM_CREDENTIALS

RUN ./create-npmrc.sh $NPM_CREDENTIALS

RUN yarn bootstrap

COPY ./packages ./packages

ARG BUILD_ENV_PARAM
ENV BUILD_ENV_PARAM=$BUILD_ENV_PARAM

#RUN yarn ws:db migration:run

RUN yarn build:dev

CMD yarn run:dev

EXPOSE 9000
