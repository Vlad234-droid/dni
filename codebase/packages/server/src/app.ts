import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import os from 'os';
import { isLocal, isPPE, isPROD } from '@dni-common/connector-utils';

import { initialize as initializeLogger, getHttpLoggerMiddleware } from '@dni-common/logger';

import { getConfig, prettify } from './config/config-accessor';
import { getEnv } from './config/env-accessor';

import { api, healthCheck } from './routes';

import {
  publicStaticFolder,
  clientStaticFolder,
  clientStaticFile,
  errorHandler,
  initializeOpenid,
  tescoApiMiddleware,
  fakeLoginConfig,
  fakeUserExtractor,
  toMiddleware,
} from './middlewares';

import { initializeTypeOrm } from './config/db';
import { identityClientScopedTokenPlugin } from '@dni-connectors/onelogin';
import { expressContext } from './context';

const config = getConfig();

let logPretify = config.loggerPretify();
if (logPretify === undefined) {
  logPretify = !!config.buildEnvironment() && isLocal(config.buildEnvironment());
}

const logLevel =
  config.loggerLevel() ||
  (isPROD(config.runtimeEnvironment()) || isPPE(config.runtimeEnvironment()) ? 'info' : logPretify ? 'trace' : 'debug');

const logger = initializeLogger(config.loggerRootName(), logLevel, logPretify);

logger.info(`Current build environment: ${config.buildEnvironment()}`);
logger.info(`Current infrastructure environment: ${config.runtimeEnvironment()}`);

if (isLocal(config.buildEnvironment())) {
  prettify(config);
}

getEnv().validate();

const app = express();

const PORT = config.port();

const context = expressContext(config);

const startServer = async () => {
  try {
    // initialize connection to DB
    await initializeTypeOrm();
    logger.info('Connection to database has been established successfully.');

    // setup logger middlewares
    app.use(getHttpLoggerMiddleware('http'));

    // setup middlewares
    app.use(
      cors({
        credentials: true,
        origin: config.applicationServerUrlRoot(),
      }),
    );

    app.use('/', healthCheck);

    if (config.useOneLogin()) {
      app.use(
        toMiddleware(
          identityClientScopedTokenPlugin({
            apiEnv: config.apiEnv,
            identityClientId: config.identityClientId(),
            identityClientSecret: config.identityClientSecret(),
            cache: true,
            optional: false,
          }),
        ),
      );

      const openIdMiddleware = await initializeOpenid(config);
      app.use(openIdMiddleware);
    } else {
      logger.warn(`WARNING! Authentication is turned off. Fake Login is being used.`);

      app.use(cookieParser());

      // fake login behavior
      app.use(fakeLoginConfig(context, config));
      app.use(fakeUserExtractor);
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

    app.use(errorHandler(config));

    app.disable('x-powered-by');

    app.listen(PORT, () => {
      logger.info(`Server is running at http://${os.hostname().toLowerCase()}:${PORT}`);
    });
  } catch (error: any) {
    logger.fatal(error);
    process.exit(1);
  }
};

startServer();

export default app;
