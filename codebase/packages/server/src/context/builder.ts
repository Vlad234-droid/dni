import { getIdentityData, getIdentityClientScopeToken as expressIdentityClientScopeToken} from '@dni-connectors/onelogin';
import { getIdentityClientScopeToken as localIdentityClientScopeToken } from '../services';

import { getAppEnv, isDEV } from '../config/env';
import { ProcessConfig } from '../config/config-accessor';
import { ExpressContextProvider } from './request-context';

import { ContextSessionData } from './session-data';
import { ContextConfigData } from './config-data';
import { Request, Response, NextFunction } from 'express';

export const expressContext: (config: ProcessConfig) => ExpressContextProvider<ContextConfigData, ContextSessionData> =
  (config: ProcessConfig) => (req: Request, res: Response, next?: NextFunction) => ({
    req: req,
    res: res,
    next: next,

    identityUserToken: () => {
      const token = getIdentityData(res)?.access_token;
      if (!token) {
        throw new Error('identity user scoped token not available!');
      }
      return token;
    },

    identityClientToken: () => {
      const token = expressIdentityClientScopeToken(res)?.access_token || '';
      if (!token && !isDEV(config.buildEnvironment())) {
        throw new Error('Identity client scoped token not available!');
      }

      return token;
    },

    apiEnv: () =>
      getAppEnv(config.runtimeEnvironment(), isDEV(config.buildEnvironment()) ? config.mockServerUrl() : undefined),

    // markApiCall: markApiCall(res),

    config: (): ContextConfigData => ({ runtimeEnvironment: config.runtimeEnvironment() }),

    sessionData: (): ContextSessionData => ({}),
  });

export const clientContext = async (config: ProcessConfig) => {
  const cstToken = await localIdentityClientScopeToken();
  return {
    identityUserToken: () => undefined,

    identityClientToken: () => {
      const token = cstToken?.access_token || '';
      if (!token && !isDEV(config.runtimeEnvironment())) {
        throw new Error('Identity client scoped token not available!');
      }

      return token;
    },

    apiEnv: () =>
      getAppEnv(config.runtimeEnvironment(), isDEV(config.buildEnvironment()) ? config.mockServerUrl() : undefined),

    markApiCall: undefined,

    config: (): ContextConfigData => ({ runtimeEnvironment: config.runtimeEnvironment() }),

    sessionData: (): ContextSessionData => ({}),
  };
}
