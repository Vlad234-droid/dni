import { appErrorFromUnknown, toResponseStatus, toResponseMessage, toHTMLResponse } from '../utils/errors';
import { ProcessConfig } from '../config/config-accessor';
import path from 'path';
import express from 'express';

export const errorHandler = 
  ({ applicationPublicUrl }: Pick<ProcessConfig, 'applicationPublicUrl'>): express.ErrorRequestHandler => 
  (error, req, res, next) => {
    // preliminary check if headers already sent
    if (res.headersSent) {
      next(error);
      return;
    }

    const applicationPath = applicationPublicUrl();
    const isViewPath = (p: String) => !p.match('^(/api|/auth|/sso|/static|/favicon.ico)');

    const ajustedPath = applicationPath !== '/' ? req.path.replace(RegExp(`^${applicationPath}`), '') : req.path;
    const isView = isViewPath(ajustedPath);

    const appError = appErrorFromUnknown(error as unknown);
    const respStatus = toResponseStatus(appError);

    return isView
      ? res.status(respStatus).sendFile(path.resolve(path.join('public', toHTMLResponse(appError))))
      : res.status(respStatus).json(toResponseMessage(appError));
  };
