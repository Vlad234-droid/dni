import { Response } from 'express';
import { executeSafe } from '../utils';
import { getConnectionOptions } from '@dni/database';

const getEnvironmentVariables: Middleware = (_, res: Response) => {
  return executeSafe(res, () => {
    const environmentVariables = process.env;
    return res.status(200).json(environmentVariables);
  });
};
    
const getTypeOrmConnectionOptions: Middleware = (_, res: Response) => {
  return executeSafe(res, () => {
    const connectionOptions = getConnectionOptions();
    return res.status(200).json(connectionOptions);
  });
};
  
export {
  getEnvironmentVariables,
  getTypeOrmConnectionOptions
};
  