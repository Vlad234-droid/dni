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
  openIdConfig,
  apiMiddleware,
  formData,
  fakeLoginConfig,
  fakeUserExtractor,
  colleagueUUIDExtractor,
} from './middlewares';
import { buildContext } from './context';
import { initializeTypeOrm } from './config/db';
import { withReturnTo } from '@energon/onelogin';

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

    if (isDEV(config.buildEnvironment()) || !config.useOneLogin()) {
      console.log(`WARNING! Authentication is turned off. Fake Login is used.`);
      // fake login behavior
      app.use(cookieParser());
      app.use(fakeLoginConfig(context, config));
      app.use(fakeUserExtractor);
    } else {
      const { openId } = openIdConfig(config);

      app.use(
        withReturnTo(await openId, {
          isViewPath: (path) => !path.match('^(/api|/auth|/sso)'),
          appPath: config.oneLoginApplicationPath(),
        }),
      );
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
