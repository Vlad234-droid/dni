import express from 'express';
import http from 'http';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { isDEV } from './config/env';

import { envAccessor, getConfig } from './services';
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
import { ViewPathPredicate, withReturnTo } from '@energon/onelogin';

envAccessor.validate();

const config = getConfig();

const upload = multer({ limits: { fieldSize: config.uploadSize } });

const app = express();
const server = http.createServer(app);
const PORT = config.port;

const context = buildContext(config);

const startServer = async () => {
  try {
    console.log(`Current build environment: ${config.buildEnvironment}`);
    console.log(`Current infrastructure environment: ${config.environment}`);

    // initialize connection to DB
    await initializeTypeOrm();

    // setup middlewares
    app.use(
      cors({
        credentials: true,
      }),
    );

    app.use('/', healthCheck);

    if (isDEV(config.buildEnvironment) || !config.withOneLogin) {
      console.log(`WARNING! Authentication is turned off. Fake Login is used.`);
      // fake login behavior
      app.use(cookieParser());
      app.use(fakeLoginConfig(context, config));
      app.use(fakeUserExtractor);
    } else {
      const { openId, openIdCookieParser, clientScopedToken } = openIdConfig(config);

      const isViewPath: ViewPathPredicate = (path) => {
        const exclude = "^(/api|/auth|/sso)"
        return !path.match(exclude)
      }

      app.use(openIdCookieParser);
      app.use(clientScopedToken());
      app.use(withReturnTo(await openId, { 
        isViewPath, 
        appPath: config.publicUrl 
      }));
    }

    app.use(colleagueUUIDExtractor('/api/cms-events'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/upload', upload.any(), formData);
    app.use('/api', api, apiMiddleware(context));
    app.use('/api/*', (_, res) => res.sendStatus(404));

    app.use(clientStaticFolder);
    app.use(publicStaticFolder);
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
