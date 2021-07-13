/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { workerData } = require('worker_threads');

if (process.env.NODE_ENV !== 'production') {
  require('ts-node/register/transpile-only');
}
require(path.resolve(__dirname, workerData.path));
