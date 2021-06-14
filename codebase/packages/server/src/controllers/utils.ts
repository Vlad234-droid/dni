import { Response } from 'express';
import { executeSafe } from '../utils';
import { getTypeOrmConnectionOptions } from '@dni/database';

const getEnvironmentVariablesMiddleware: Middleware = (_, res: Response) => {
  return executeSafe(res, () => {
    const environmentVariables = process.env;
    return res.status(200).json(environmentVariables);
  });
};
    
const getTypeOrmConnectionOptionsMiddleware: Middleware = (_, res: Response) => {
  return executeSafe(res, () => {
    const connectionOptions = getTypeOrmConnectionOptions();
    return res.status(200).json(connectionOptions);
  });
};
  
export {
  getEnvironmentVariablesMiddleware,
  getTypeOrmConnectionOptionsMiddleware
};
  