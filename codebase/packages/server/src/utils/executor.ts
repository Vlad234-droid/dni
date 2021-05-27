import { Response } from 'express';

export const executeSafe = async (
  res: Response,
  action: () => Response | Promise<Response>,
) => {
  try {
    return await action();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal Server error', code: 500, exceptionDetails: e });
  }
};
