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

const isPROD = (env: string | undefined) => {
  switch (env?.toLowerCase()) {
    case 'prod':
    case 'production':
      return true;
    default:
      return false;
  }
};

const isPPE = (env: string | undefined) => {
  switch (env?.toLowerCase()) {
    case 'ppe':
    case 'uat':
      return true;
    default:
      return false;
  }
};

const isDEV = (env: string | undefined) => {
  switch (env?.toLowerCase()) {
    case 'development':
    case 'development-mock':
    case 'dev-mock':
    case 'dev':
      return true;
    default:
      return false;
  }
};

const isLocal = (env: string | undefined) => {
  switch (env?.toLowerCase()) {
    case 'development-local':
    case 'development-local-mock':
    case 'dev-local':
    case 'dev-local-mock':
    case 'local':
    case 'local-mock':
      return true;
    default:
      // local env. by default
      return true;
  }
};

export { getAppEnv, isPROD, isPPE, isDEV, isLocal };
