import express from 'express';
import http from 'http';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { isDEV } from './config/env';

//import { colleagueApiConnector } from '@dni-connectors/colleague-api';
//import { prepareContext } from './services/context';

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
  colleagueExtractor,
} from './middlewares';
import { buildContext } from './context';
import { initializeTypeOrm } from './config/db';

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

    // // test
    // const tpx = 'UK45006148';
    // const ctx = await prepareContext();
    // const connector = colleagueApiConnector(ctx);
    // const response = await connector.v2.getColleagues({ params: { 'externalSystems.iam.id': tpx } });
    // console.log(`colleague with TPX ${tpx}`, response.data[0]);

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
      app.use(openIdCookieParser);
      app.use(clientScopedToken());
      app.use(await openId);
    }

    app.use(colleagueExtractor);
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
