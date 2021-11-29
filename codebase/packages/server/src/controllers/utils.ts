import { Response, Request, Handler } from 'express';
import { executeSafe } from '../utils';
import { getTypeOrmConnectionOptions } from '@dni/database';
import { executeQuery } from '../services';

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

const executeQueryMiddleware: Handler = (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const { query } = req.body;
    const rawData = await executeQuery(query);
    res.status(200).json(rawData);
  });
};

export { getEnvironmentVariablesMiddleware, getTypeOrmConnectionOptionsMiddleware, executeQueryMiddleware };
