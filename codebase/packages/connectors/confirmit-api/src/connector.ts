import { fetchClient, resolveBaseUrl, ConnectorContext } from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { defineAPI } from '@energon/rest-api-definition';

import { ConfigContext } from '@dni-common/connector-utils';

import { CONFIRMIT_API_URLS, confirmitApiConfigs, ConfirmitApiHeaders } from './constants';

const { logon: logonConfig, reporting: reportingConfig } = confirmitApiConfigs;

export const logonApiDef = defineAPI((endpoint) => ({
  /**
   * API: ws.euro.confirmit.com/confirmit/webservices/current/logon.asmx
   */
  logon: endpoint.post(logonConfig.path).response<string>().body<string>().build(),
}));

export const reportingApiDef = defineAPI((endpoint) => ({
  /**
   * API: ws.euro.confirmit.com/confirmit/webservices/current/reporting.svc
   */
  reporting: endpoint.post(reportingConfig.path).response<string>().body<string>().build(),
}));

export type ConfirmitConfig = {
  confirmitPassword: string;
};

type Context = ConnectorContext & ConfigContext<ConfirmitConfig>;

export const confirmitApiConnector = (ctx: Context) => {
  const logonHeaders: ConfirmitApiHeaders = logonConfig.headers;
  const reportingHeaders: ConfirmitApiHeaders = reportingConfig.headers;

  const baseUrl = resolveBaseUrl(CONFIRMIT_API_URLS, ctx);

  return {
    current: {
      ...createApiConsumer(logonApiDef, fetchClient(baseUrl, logonHeaders, {}), {
        transport: 'XML',
      }),
      ...createApiConsumer(reportingApiDef, fetchClient(baseUrl, reportingHeaders, {}), {
        transport: 'XML',
      }),
    },
  };
};

export type ConfirmitApi = ReturnType<typeof confirmitApiConnector>;
