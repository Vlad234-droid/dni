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

const servePublicStatic = express.static(serverPublicFolder, { fallthrough: true });
const serveClientStatic = express.static(clientDistFolder, { fallthrough: true, index: false });

export const publicStaticFolder: express.Handler = (req, res, next) => {
  if (!res.headersSent) {
    servePublicStatic(req, res, next);
  }
};

export const clientStaticFolder: express.Handler = (req, res, next) => {
  if (!res.headersSent) {
    serveClientStatic(req, res, next);
  }
};

export const clientStaticFile: express.Handler = (_, res) => {
  if (!res.headersSent) res.sendFile(htmlFilePath);
};
