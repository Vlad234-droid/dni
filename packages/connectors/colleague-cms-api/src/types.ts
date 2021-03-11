import { ConnectorContext } from '@energon-connectors/core';

type ColleagueCmsApiContext = Pick<
  ConnectorContext,
  'identityClientToken' | 'apiEnv' | 'markApiCall'
>;

type ColleagueCmsApiHeaders = {
  Authorization: () => string;
};

export type { ColleagueCmsApiContext, ColleagueCmsApiHeaders };
