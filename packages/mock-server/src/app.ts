import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

import config from './config';
import { healthCheck, api } from './controllers';

const app = express();
const server = http.createServer(app);
const PORT = config.port;

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', healthCheck);
app.use('/', api);

server.listen(PORT, () => {
  console.log(
    `⚡️[mock-server]: Server is running at http://localhost:${PORT}`,
  );
});

export { app };
export default server;
