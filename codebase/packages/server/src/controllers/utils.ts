import { Response, Handler } from 'express';
import { executeSafe } from '../utils';
import { getTypeOrmConnectionOptions } from '@dni/database';

const getEnvironmentVariablesMiddleware: Handler = (_, res: Response) => {
  executeSafe(res, () => {
    const environmentVariables = process.env;
    res.status(200).json(environmentVariables);
  });
};

const getTypeOrmConnectionOptionsMiddleware: Handler = (_, res: Response) => {
  executeSafe(res, () => {
    const connectionOptions = getTypeOrmConnectionOptions();
    res.status(200).json(connectionOptions);
  });
};

export { getEnvironmentVariablesMiddleware, getTypeOrmConnectionOptionsMiddleware };
