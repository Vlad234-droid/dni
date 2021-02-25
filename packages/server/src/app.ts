import express from 'express';
import http from 'http';

import { envAccessor, ConfigAccessor } from './services';
import { healthCheck, api } from './routes';
import {
  clientStaticFolder,
  publicStaticFolder,
  clientStaticFile,
  errorHandler,
  openIdConfig,
} from './middlewares';

// validate if all required process env variables exist
envAccessor.validate();

const config = ConfigAccessor.getInstance(envAccessor.getData()).getData();

const app = express();
const server = http.createServer(app);
const PORT = config.port;

const { openId, openIdCookieParser } = openIdConfig(config);

openId
  .then((openIdMiddleware) => {
    // middlewares
    app.use('/', healthCheck);
    // app.use(openIdMiddleware);
    app.use(openIdCookieParser);
    app.use('/api', api);
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
