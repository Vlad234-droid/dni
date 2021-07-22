import { Request, Response } from 'express';

import { buildContext, RequestCtx } from '../context';
import { getConfig } from '../config/config-accessor';

const config = getConfig();
const context = buildContext(config);

const prepareContext = async (req = {} as Request, res = {} as Response) => {
  return context(req, res);
};

export type { RequestCtx };

export { prepareContext };
