import { Response } from 'express';
import { executeSafe } from '../utils';
import { getConnectionOptions } from '@dni/database';

const getTypeOrmConnectionOptions: Middleware = (_, res: Response) => {
  return executeSafe(res, () => {
    const connectionOptions = getConnectionOptions();
    return res.status(200).json(connectionOptions);
  });
};
  
export {
  getTypeOrmConnectionOptions
};
  