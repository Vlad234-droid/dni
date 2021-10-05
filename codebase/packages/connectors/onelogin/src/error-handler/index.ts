import express from 'express';
import { ONELOGIN_RETURN_URI_PARAM, OneloginError, LoggerEvent, Logger, AUTHENTICATION_PATH } from '..';

type ErrorHandlerConfig = {
  applicationPath: string;
  noRedirectPathFragments: string[];
  clearCookies: (res: express.Response) => void;
  logger: Logger;
};

export const errorHandler =
  ({ applicationPath, noRedirectPathFragments, clearCookies, logger }: ErrorHandlerConfig) =>
  (error: OneloginError | Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // preliminary check if headers already sent
    if (res.headersSent) {
      next(error);
      return;
    }

    clearCookies(res);

    const status = OneloginError.is(error) ? error.status : 500;
    const flow = OneloginError.is(error) ? error.flow : 'other';
    const redirectAuthenticationPath = `${applicationPath}${AUTHENTICATION_PATH}`;

    const canRedirect = !noRedirectPathFragments.some((pathFragment) => req.originalUrl.includes(pathFragment));

    if (canRedirect) {
      const message =
        status === 401
          ? `${error.message} - User will be redirected to the ${redirectAuthenticationPath}, return path after login: ${req.path}`
          : `${error.message} - Error will be forwarded to application error handler`;

      if (status === 401) {
        logger(LoggerEvent.info(flow, message, { req, res }));
        res.redirect(`${redirectAuthenticationPath}?${ONELOGIN_RETURN_URI_PARAM}=${encodeURI(req.path)}`);
        next();
      } else {
        logger(LoggerEvent.error(flow, Error(message), { req, res }));
        next(error);
      }
    } else {
      const message = `${status}, ${error.message}`;
      logger(LoggerEvent.error(flow, Error(message), { req, res }));
      res.status(status).json(error.message);
      next(error);
    }
  };
