# The instructions for the first stage
FROM node:14.4-alpine 

ARG BUILD_ENV_PARAM
ENV BUILD_ENV_PARAM=${BUILD_ENV_PARAM}

RUN mkdir -p home/app
WORKDIR /home/app

COPY ./ ./

RUN yarn bootstrap

COPY ./packages ./packages

RUN yarn build:prod

CMD yarn run:prod

EXPOSE 9000