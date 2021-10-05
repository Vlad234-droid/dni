import { Response } from 'express';
import { FetchError } from '@energon/fetch-client';
import { ApiError } from './api-error';

export const executeSafe = async (res: Response, action: () => void | Promise<void>) => {
  try {
    await action();
  } catch (e) {
    if (FetchError.is(e)) {
      res.status(e.status).json({ error: e.details, code: e.status });
    } else if (ApiError.is(e)) {
        res.status(e.status).json({ error: e.reason, code: e.status, details: e.details });
    } else {
      res.status(500).json({ error: 'Internal Server error', code: 500, exceptionDetails: e });
    }
  }
};
