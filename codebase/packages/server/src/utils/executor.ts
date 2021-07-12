import { Response } from 'express';
import { FetchError } from '@energon/fetch-client';

export const executeSafe = async (res: Response, action: () => Response | Promise<Response>) => {
  try {
    return await action();
  } catch (e) {
    if (FetchError.is(e)) {
      return res.status(e.status).json({ error: e.details, code: e.status, exceptionDetails: e });
    }
    return res.status(500).json({ error: 'Internal Server error', code: 500, exceptionDetails: e });
  }
};
