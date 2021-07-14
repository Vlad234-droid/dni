import fs from 'fs';
import path from 'path';
import express from 'express';

import { getPackageDistFolder } from '../utils';
import { getEnv } from '../config/env-accessor';

const processEnv = getEnv().getVariables();

// prepare static artifact
const clientDistFolder = getPackageDistFolder('@dni/client', ['src', 'build']);
const serverPublicFolder = getPackageDistFolder('@dni/server', ['src', 'public']);

const htmlFilePath = path.join(clientDistFolder, 'index.html');

if (processEnv.NODE_ENV !== 'test' && !fs.existsSync(htmlFilePath)) {
  throw Error(`Couldn't find HTML file ${htmlFilePath}`);
}

const clientStaticFolder = express.static(clientDistFolder, { index: false });
const publicStaticFolder = express.static(serverPublicFolder);

const clientStaticFile: Middleware = (_, res) => {
  res.sendFile(htmlFilePath);
};

export { clientStaticFolder, publicStaticFolder, clientStaticFile };
