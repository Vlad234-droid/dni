import express from 'express';
import http from 'http';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { isDEV } from './config/env';

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

getEnv().validate();

const config = getConfig();

const upload = multer({ limits: { fieldSize: config.applicationUploadSize() } });

const app = express();
const server = http.createServer(app);
const PORT = config.port();

const context = buildContext(config);

const startServer = async () => {
  try {
    console.log(`Current build environment: ${config.buildEnvironment()}`);
    console.log(`Current infrastructure environment: ${config.environment()}`);

    // initialize connection to DB
    await initializeTypeOrm();

    // setup middlewares
    app.use(
      cors({
        credentials: true,
        origin: config.applicationUrlRoot(),
      }),
    );

    app.use('/', healthCheck);
    //app.use(cookieParser());

    if (isDEV(config.buildEnvironment()) || !config.useOneLogin()) {
      console.log(`WARNING! Authentication is turned off. Fake Login is used.`);
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
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();

export { app, express };
export default server;
