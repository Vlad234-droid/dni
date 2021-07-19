import express from 'express';
import http from 'http';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { isDEV } from './config/env';

import pino from 'pino';
import pinoHttp from 'pino-http';
import pinoPretty from 'pino-pretty';

import { getConfig } from './config/config-accessor';
import { getEnv } from './config/env-accessor';
import { healthCheck, api } from './routes';
import {
  clientStaticFolder,
  publicStaticFolder,
  clientStaticFile,
  errorHandler,
  configureOneloginMidleware,
  apiMiddleware,
  formData,
  fakeLoginConfig,
  fakeUserExtractor,
  colleagueUUIDExtractor,
} from './middlewares';

import { buildContext } from './context';
import { initializeTypeOrm } from './config/db';

const logger = pino({
  name: 'server',
  level: 'trace',
  prettyPrint: { 
    colorize: true, 
    translateTime: 'yyyy-mm-dd HH:MM:ss o', 
    ignore: 'pid,hostname',
  },
  prettifier: pinoPretty,
});

getEnv().validate();

const config = getConfig();

const upload = multer({ limits: { fieldSize: config.applicationUploadSize() } });

const app = express();

const server = http.createServer(app);
const PORT = config.port();

const context = buildContext(config);

const startServer = async () => {
  try {
    logger.info(`Current build environment: ${config.buildEnvironment()}`);
    logger.info(`Current infrastructure environment: ${config.environment()}`);

    // initialize connection to DB
    await initializeTypeOrm();

    app.use(pinoHttp({
      name: 'server.express',
      logger: logger,
      customLogLevel: (res, err) => {
        if (res.statusCode >= 400 && res.statusCode < 500) {
          return 'warn'
        } else if (res.statusCode >= 500 || err) {
          return 'error'
        }
        return 'debug'
      },
      serializers: {
        req: (req) => ({
          id: req.id,
          method: req.method,
          url: req.url,
          originalUrl: req.originalUrl,
          remoteAddress: req.remoteAddress,
          remotePort: req.remotePort,
        }),
        res: (res) => {
          return {
            statusCode: res.statusCode,
            location: res.statusCode === 302 ? res.headers?.location : undefined,
            contentType: res.statusCode === 200 || res.statusCode === 201 ? res.headers?.contentType : undefined,
            contentLength: res.statusCode === 200 || res.statusCode === 201 ? res.headers?.contentLength : undefined,
            //headers: res.headers,
          };
        },
        err: pino.stdSerializers.err,
      },
      wrapSerializers: true,
    }));

    // setup middlewares
    app.use(
      cors({
        credentials: true,
        origin: config.applicationUrlRoot(),
      }),
    );

    app.use('/', healthCheck);
    //app.use(cookieParser());

    if (/*isDEV(config.buildEnvironment()) ||*/ !config.useOneLogin()) {
      logger.warn(`WARNING! Authentication is turned off. Fake Login is being used.`);

      // fake login behavior
      app.use(fakeLoginConfig(context, config));
      app.use(fakeUserExtractor);
    } else {
      const { openIdMiddleware, identityClientScopedTokenMiddleware } = await configureOneloginMidleware(config);
      // app.use(preAuth(config));
      app.use(cookieParser(config.applicationCookieParserSecret()));
      app.use(identityClientScopedTokenMiddleware());
      app.use(openIdMiddleware);
    }

    app.use(colleagueUUIDExtractor({ excludePath: ['/api/cms-events'] }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/upload', upload.any(), formData);
    app.use('/api', api, apiMiddleware(context));
    app.use('/api/*', (_, res) => res.sendStatus(404));

    app.use(publicStaticFolder);
    app.use(clientStaticFolder);
    app.use(clientStaticFile);

    app.use(errorHandler);

    server.listen(PORT, () => {
      //console.log(`⚡️ Server is running at http://localhost:${PORT}`);
      logger.info(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();

export { app, express };
export default server;
