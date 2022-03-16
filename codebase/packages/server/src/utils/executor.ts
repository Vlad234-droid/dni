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

const sleep = async (ms: number) => {
  return await new Promise((r) => setTimeout(r, ms));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncFun = () => Promise<any>;

export const executeSequentially = async (tasks: AsyncFun[], ms = 0) => {
  for (const fn of tasks) {
    await sleep(ms);
    await fn();
  }
};
