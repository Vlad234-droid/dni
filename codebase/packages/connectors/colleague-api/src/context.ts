import { ApiEnv, ConnectorContext } from '@energon-connectors/core';

export type ColleagueApiContext = Pick<ConnectorContext, 'identityClientToken' | 'apiEnv'>;

export const buildColleagueApiContext = (
  runtimeEnvironment: () => string,
  identityClientToken: () => string,
): ColleagueApiContext => {
  const acquireApiEnv = (env: string) => () => {
    switch (env.toUpperCase()) {
      case 'PROD':
      case 'PRODUCTION':
        return ApiEnv.prod();
      // case 'LOCAL' :
      //   return ApiEnv.local('http://localhost:9000');
      default:
        return ApiEnv.ppe();
    }
  };

  return {
    apiEnv: acquireApiEnv(runtimeEnvironment()),
    identityClientToken,
  };
};
