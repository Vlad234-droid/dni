import { ApiEnv } from '@energon-connectors/core';

const getAppEnv = (env: string, localBaseUrl?: string) => {
  switch (true) {
    case isPROD(env):
      return ApiEnv.prod();
    case isPPE(env):
      return ApiEnv.ppe();
    case isDEV(env):
    default:
      return ApiEnv.local(localBaseUrl!);
  }
};

const isPPE = (env: string) => {
  switch (env.toLowerCase()) {
    case 'ppe':
    case 'sit':
    case 'uat':
      return true;
    default:
      return false;
  }
};

const isPROD = (env: string) => {
  switch (env.toLowerCase()) {
    case 'beta':
    case 'prod':
    case 'production':
      return true;
    default:
      return false;
  }
};

const isDEV = (env: string) => {
  switch (env.toLowerCase()) {
    case 'development':
    case 'development-local':
    case 'dev-local-mock':
    case 'dev':
      return true;
    default:
      return false;
  }
};

export { getAppEnv, isPPE, isPROD, isDEV };
