import { FetchError } from '@energon/fetch-client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorMiddleware = (err, _req, res, next) => {
  if (FetchError.is(err)) {
    res.status(err.status).send(err.details);
    return next();
  }
  res.status(500).send('Something broke!');
};
