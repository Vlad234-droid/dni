import express from "express";
import { OneloginError } from "..";
import { LoggerEvent, Logger, AUTHENTICATION_PATH } from "..";

type ErrorHandlerConfig = {
  applicationPath: string;
  noRedirectPathFragments: string[];
  clearCookies: (res: express.Response) => void;
  logger: Logger;
};

export const errorHandler = ({
  applicationPath,
  noRedirectPathFragments,
  clearCookies,
  logger,
}: ErrorHandlerConfig) => (
  error: OneloginError | Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  clearCookies(res);
  const status = OneloginError.is(error) ? error.status : 500;
  const flow = OneloginError.is(error) ? error.flow : "other";
  const redirectAuthenticationPath = `${applicationPath}${AUTHENTICATION_PATH}`;

  const canRedirect = !noRedirectPathFragments.some((pathFragment) =>
    req.originalUrl.includes(pathFragment),
  );

  if (canRedirect) {
    const message =
      status === 401
        ? `${error.message} - User will be redirected to the ${redirectAuthenticationPath}`
        : `${error.message} - Error will be forwarded to application error handler`;

    logger(LoggerEvent.error(flow, Error(message), { req, res }));

    return status === 401
      ? res.redirect(redirectAuthenticationPath)
      : next(error);
  }

  const message = `${status}, ${error.message}`;
  logger(LoggerEvent.error(flow, Error(message), { req, res }));

  return res.status(status).send(error.message);
};
