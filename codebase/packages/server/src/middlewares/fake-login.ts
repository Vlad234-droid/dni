import { ContextProvider } from '@energon/rest-api-provider';

import { ProcessConfig } from '../config/config-accessor';

export const fakeLoginConfig = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: ContextProvider<any>,
  config: ProcessConfig,
): Middleware => {
  return async (req, res, next) => {
    //await enrichResWithToken(res, context(req, res), config);
    next();
  };
};
