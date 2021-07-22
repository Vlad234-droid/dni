import { Response } from 'express';
import { FetchError } from '@energon/fetch-client';

export const executeSafe = async (res: Response, action: () => void | Promise<void>) => {
  try {
    await action();
  } catch (e) {
    if (FetchError.is(e)) {
      res.status(e.status).json({ error: e.details, code: e.status, exceptionDetails: e });
    } else {
      res.status(500).json({ error: 'Internal Server error', code: 500, exceptionDetails: e });
    }
  }
};
