import fs from 'fs';
import path from 'path';
import express from 'express';

import { envAccessor } from '../services';
import { getPackageDistFolder } from '../utils';

const processEnv = envAccessor.getData();

// prepare static artifact
const clientDistFolder = getPackageDistFolder('@dni/client', ['src', 'build']);
const htmlFilePath = path.join(clientDistFolder, 'index.html');

if (processEnv.NODE_ENV !== 'test' && !fs.existsSync(htmlFilePath)) {
  throw Error(`Couldn't find HTML file ${htmlFilePath}`);
}

const clientStaticFolder = express.static(clientDistFolder, { index: false });
const publicStaticFolder = express.static('public');

const clientStaticFile: Middleware = (_, res) => {
  res.sendFile(htmlFilePath);
};

export { clientStaticFolder, publicStaticFolder, clientStaticFile };
