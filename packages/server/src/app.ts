import express from 'express';
import http from 'http';
import expressFileupload from 'express-fileupload';

import { envAccessor, ConfigAccessor } from './services';
import { healthCheck, api } from './routes';
import {
  clientStaticFolder,
  publicStaticFolder,
  clientStaticFile,
  errorHandler,
  openIdConfig,
  apiMiddleware,
} from './middlewares';
import { buildContext } from './context';

// validate if all required process env variables exist
envAccessor.validate();

const config = ConfigAccessor.getInstance(envAccessor.getData()).getData();

const app = express();
const server = http.createServer(app);
const PORT = config.port;

const context = buildContext(config);

const { openId, openIdCookieParser } = openIdConfig(config);

openId
  .then((openIdMiddleware) => {
    // middlewares
    app.use('/', healthCheck);
    // app.use(openIdMiddleware);
    app.use(expressFileupload());
    app.use(openIdCookieParser);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(apiMiddleware(context, api));
    app.use('/api', api);
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
