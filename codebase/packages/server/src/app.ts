import express from 'express';
import http from 'http';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { isDEV } from './config/env';

import { envAccessor, ConfigAccessor, establishConnection } from './services';
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
} from './middlewares';
import { buildContext } from './context';
import { buildIO } from './config/notification';
import './config/db';

// validate if all required process env variables exist
envAccessor.validate();

const config = ConfigAccessor.getInstance(envAccessor.getData()).getData();

const upload = multer({ limits: { fieldSize: config.uploadSize } });

const app = express();
const server = http.createServer(app);
const PORT = config.port;

const context = buildContext(config);

// ws connection
establishConnection(buildIO(server));

const { openId, openIdCookieParser, clientScopedToken } = openIdConfig(config);
const fakeLogin = fakeLoginConfig(context, config);

openId
  .then((openIdMiddleware) => {
    // middlewares
    app.use(cors());
    app.use('/', healthCheck);
    if (isDEV(config.environment) || !config.withOneLogin) {
      // fake login behavior
      app.use(cookieParser());
      app.use(fakeLogin);
      app.use(fakeUserExtractor);
    } else {
      app.use(openIdCookieParser);
      app.use(clientScopedToken());
      app.use(openIdMiddleware);
    }
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
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

export { app, express };
export default server;
