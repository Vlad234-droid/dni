import { ApiUrlConfig, ApiEnv } from '@energon-connectors/core';

export const CONFIRMIT_API_URLS: ApiUrlConfig = {
  LOCAL: '/ws.euro.confirmit.com',
  PPE: 'https://ws.euro.confirmit.com',
  PROD: 'https://ws.euro.confirmit.com',
};

export type ConfirmitApiHeaders = {
  'Content-Type': string;
  SOAPAction: string;
  Host: string;
};

type ConfirmitApiConfig = {
  path: string;
  headers: ConfirmitApiHeaders;
};

type ConfirmitApiConfigs = Record<'logon' | 'reporting', ConfirmitApiConfig>;

export const confirmitApiConfigs: ConfirmitApiConfigs = {
  logon: {
    path: '/confirmit/webservices/current/logon.asmx',
    headers: {
      'Content-Type': 'text/xml',
      SOAPAction: 'http://firmglobal.com/Confirmit/webservices/LogOnUser',
      Host: 'ws.euro.confirmit.com',
    },
  },
  reporting: {
    path: '/confirmit/webservices/current/reporting.svc',
    headers: {
      'Content-Type': 'text/xml',
      SOAPAction:
        'http://firmglobal.com/Confirmit/webservices/reporting/27-03-2008/IReportingService/GetReportPermissions',
      Host: 'ws.euro.confirmit.com',
    },
  },
};

type ConfirmitReportConfig = {
  user: string;
  id: number;
  enduserListId: number;
};
type ConfirmitReportConfigs = Record<ApiEnv['name'], ConfirmitReportConfig>;

export const confirmitReportConfigs: ConfirmitReportConfigs = {
  LOCAL: {
    user: 'api_tesco',
    id: 216100,
    enduserListId: 5451,
  },
  PPE: {
    user: 'api_tesco',
    id: 216100,
    enduserListId: 5451,
  },
  PROD: {
    user: 'api_tesco',
    id: 216100,
    enduserListId: 5451,
  },
};

export const resolveReportConfig = (ctx: { apiEnv: () => ApiEnv }) => {
  const env = ctx.apiEnv();
  return confirmitReportConfigs[env.name];
};
