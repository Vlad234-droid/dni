import { FetchError } from '@energon/fetch-client';

export const errorHandler: ErrorMiddleware = (err, _, res, next) => {
  if (FetchError.is(err)) {
    res.status(err.status).send(err.details);
    return next();
  }
  res.status(500).send('Something broke!');
};
