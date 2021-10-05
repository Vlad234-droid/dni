import { appErrorFromUnknown, toResponseStatus, toResponseMessage, toHTMLResponse } from '../utils/errors';
import path from 'path';
import express from 'express';

export const errorHandler: express.ErrorRequestHandler = (error, req, res, next) => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  // preliminary check if headers already sent
  if (res.headersSent) {
    next(error);
    return;
  }

  console.log(error);

  const isViewPath = (p: String) => !p.match('^(/api|/auth)');
  const isView = isViewPath(req.path);

  const appError = appErrorFromUnknown(error as unknown);
  const respStatus = toResponseStatus(appError);

  return isView
    ? res.status(respStatus).sendFile(path.resolve(path.join('public', toHTMLResponse(appError))))
    : res.status(respStatus).json(toResponseMessage(appError));
};
