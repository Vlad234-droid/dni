import { ProcessConfig } from 'services/config-accessor';
import { ContextProvider } from '@energon/rest-api-provider';
import { identityApiConnector, buildBody } from '@dni-connectors/identity-api';
import { setIdentityClientData } from '@energon/onelogin';

export const fakeLoginConfig = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestCtx: ContextProvider<any>,
  { identityClientId, identityClientSecret }: ProcessConfig,
) => {
  const middleware: Middleware = async (req, res, next) => {
    const body = buildBody(identityClientId, identityClientSecret);
    const connector = identityApiConnector(requestCtx(req, res));

    const result = await connector.getToken({ body });

    setIdentityClientData(res, result.data);

    next();
  };

  return middleware;
};
