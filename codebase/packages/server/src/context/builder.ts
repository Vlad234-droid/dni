import { markApiCall } from '@energon/splunk-logger';

import { getIdentityData, getIdentityClientScopeToken } from '@dni-connectors/onelogin';

import { getAppEnv, isDEV } from '../config/env';
import { ProcessConfig } from '../config/config-accessor';
import { ContextProvider } from './request-context';

import { ContextSessionData } from './session-data';
import { ContextConfigData } from './config-data';
import { Request, Response, NextFunction } from 'express';

export const buildContext: (config: ProcessConfig) => ContextProvider<ContextConfigData, ContextSessionData> =
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
      const token = getIdentityClientScopeToken(res)?.access_token || '';
      if (!token && !isDEV(config.environment())) {
        throw new Error('Identity client scoped token not available!');
      }

      return token;
    },

    apiEnv: () =>
      getAppEnv(config.environment(), isDEV(config.buildEnvironment()) ? config.mockServerUrl() : undefined),

    markApiCall: markApiCall(res),

    config: (): ContextConfigData => ({ runtimeEnvironment: config.environment() }),

    sessionData: (): ContextSessionData => ({}),
  });
