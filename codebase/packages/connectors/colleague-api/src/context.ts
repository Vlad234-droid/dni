import { ApiEnv, ConnectorContext } from '@energon-connectors/core';
import { MarkApiCall } from '@energon/splunk-logger';

export type ColleagueApiContext = Pick<ConnectorContext, 'identityClientToken' | 'apiEnv' | 'markApiCall'>;

export const buildColleagueApiContext = (
  runtimeEnvironment: () => string,
  identityClientToken: () => string,
  markApiCall?: MarkApiCall,
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
    markApiCall,
  };
};
