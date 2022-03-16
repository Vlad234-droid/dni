import { getIdentityData, getIdentityClientScopeToken as expressIdentityClientScopeToken} from '@dni-connectors/onelogin';
import { acquireIdentityClientScopeToken } from '../services';

import { getAppEnv, isDEV } from '@dni-common/connector-utils';
import { ProcessConfig } from '../config/config-accessor';
import { ExpressContextProvider } from './request-context';

import { ContextSessionData } from './session-data';
import { ContextConfigData } from './config-data';
import { Request, Response, NextFunction } from 'express';

/**
 * 
 * @param config 
 * @returns 
 */
export const expressContext: (config: ProcessConfig) => ExpressContextProvider<ContextConfigData, ContextSessionData> =
  (config: ProcessConfig) => (req: Request, res: Response, next?: NextFunction) => ({
    req: req,
    res: res,
    next: next,

    identityUserToken: () => {
      const token = getIdentityData(res)?.access_token;
      if (!token) {
        throw Error('Identity user scoped token not available!');
      }
      return token;
    },

    identityClientToken: () => {
      const token = expressIdentityClientScopeToken(res)?.access_token || '';
      if (!token && !isDEV(config.buildEnvironment())) {
        throw Error('Identity client scoped token not available!');
      }
      return token;
    },

    apiEnv: () =>
      getAppEnv(config.runtimeEnvironment(), isDEV(config.buildEnvironment()) ? config.mockServerUrl() : undefined),

    config: (): ContextConfigData => ({ 
      runtimeEnvironment: config.runtimeEnvironment,
      colleagueCmsBaseUrl: config.colleagueCmsBaseUrl,
      colleagueCmsTenantKey: config.colleagueCmsTenantKey,
    }),

    sessionData: (): ContextSessionData => ({
    }),
  });

/**
 * 
 * @param config 
 * @returns 
 */
export const clientContext = async (config: ProcessConfig) => {
  const cstToken = await acquireIdentityClientScopeToken();
  return {
    identityUserToken: () => { 
      throw Error('Identity user scoped token not available in clientContext!'); 
    },

    identityClientToken: () => {
      const token = cstToken?.access_token || '';
      if (!token && !isDEV(config.runtimeEnvironment())) {
        throw Error('Identity client scoped token not available!');
      }
      return token;
    },

    apiEnv: () =>
      getAppEnv(config.runtimeEnvironment(), isDEV(config.buildEnvironment()) ? config.mockServerUrl() : undefined),

    config: (): ContextConfigData => ({ 
      runtimeEnvironment: config.runtimeEnvironment,
      colleagueCmsBaseUrl: config.colleagueCmsBaseUrl,
      colleagueCmsTenantKey: config.colleagueCmsTenantKey,
    }),

    sessionData: (): ContextSessionData => ({
    }),
  };
}
