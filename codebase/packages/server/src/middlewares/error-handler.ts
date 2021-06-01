import {
  appErrorFromUnknown,
  toResponseStatus,
  toResponseMessage,
  toHTMLResponse,
} from '../utils/errors';
import path from 'path';

export const errorHandler: ErrorMiddleware = (err: unknown, req, res, _) => {
  const error = appErrorFromUnknown(err);

  res.status(toResponseStatus(error));

  req.url.startsWith('/api/')
    ? res.json(toResponseMessage(error))
    : res.sendFile(path.resolve(path.join('public', toHTMLResponse(error))));
};
