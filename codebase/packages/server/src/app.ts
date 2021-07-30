import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import os from 'os';
import { isDEV } from './config/env';

import { initialize as initializeLogger, getHttpLoggerMiddleware } from '@dni-common/logger';

import { getConfig } from './config/config-accessor';
import { getEnv } from './config/env-accessor';

import { api, healthCheck } from './routes';

import {
  publicStaticFolder,
  clientStaticFolder,
  clientStaticFile,
  errorHandler,
  configureOneloginMidleware,
  tescoApiMiddleware,
  fakeLoginConfig,
  fakeUserExtractor,
  toMiddleware,
} from './middlewares';

import { initializeTypeOrm } from './config/db';
import { identityClientScopedTokenPlugin } from '@dni-connectors/onelogin';
import { expressContext } from './context';

const logger = initializeLogger('server');

getEnv().validate();

const config = getConfig();

const app = express();

const server = http.createServer(app);

const PORT = config.port();

const context = expressContext(config);

const startServer = async () => {
  try {
    logger.info(`Current build environment: ${config.buildEnvironment()}`);
    logger.info(`Current infrastructure environment: ${config.environment()}`);

    // initialize connection to DB
    await initializeTypeOrm();
    logger.info('Connection to database has been established successfully.');

    // setup logger middlewares
    app.use(getHttpLoggerMiddleware('http'));

    // setup middlewares
    app.use(
      cors({
        credentials: true,
        origin: config.applicationUrlRoot(),
      }),
    );

    app.use('/', healthCheck);

    if (isDEV(config.buildEnvironment()) || !config.useOneLogin()) {
      logger.warn(`WARNING! Authentication is turned off. Fake Login is being used.`);

      app.use(cookieParser());

      // fake login behavior
      app.use(fakeLoginConfig(context, config));
      app.use(fakeUserExtractor);
    } else {
      app.use(toMiddleware(
        identityClientScopedTokenPlugin({
          identityClientId: config.identityClientId(),
          identityClientSecret: config.identityClientSecret(),
          cache: true,
          optional: false,
        })
      ));
  
      const openIdMiddleware = await configureOneloginMidleware(config);
      app.use(openIdMiddleware);
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', api);
    app.use('/api/tesco', tescoApiMiddleware(context));
    app.use('/api/*', (_, res) => {
      if (!res.headersSent) res.sendStatus(404);
    });

    app.use(publicStaticFolder);
    app.use(clientStaticFolder);
    app.use(clientStaticFile);

    app.use(errorHandler);

    server.listen(PORT, () => {
      //console.log(`⚡️ Server is running at http://localhost:${PORT}`);
      logger.info(`Server is running at http://${os.hostname().toLowerCase()}:${PORT}`);
    });
  } catch (error) {
    logger.fatal(error);
    process.exit(1);
  }
};

startServer();

export { app, express };
export default server;
