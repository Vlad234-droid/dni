import { FetchError } from '@energon/fetch-client';

export const errorHandler: ErrorMiddleware = (err, _, res, next) => {
  console.error(err);

  if (FetchError.is(err)) {
    res.status(err.status).send(err.details);
    return next();
  }
  
  res.status(500).json({ error: 'Internal Server error', code: 500, exceptionDetails: err });
};
