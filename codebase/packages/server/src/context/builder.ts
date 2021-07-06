import { getIdentityData, getUserData, getIdentityClientData } from '@energon/onelogin';
import { ConfirmitConfig } from '@dni-connectors/confirmit-api';
import { BasicUserData, ContextProvider, RequestCtx, ExtractedOpenIdData, ExtractedUSTData } from './request-context';
import { ExtendedSessionData, getExtendedSessionData } from './session-data';
import { addCustomLog, markApiCall } from '@energon/splunk-logger';
import { ProcessConfig } from 'services/config-accessor';
import { getAppEnv } from '../config/env';

export type ColleagueContextConfig = ConfirmitConfig;
export type ColleagueSessionData = BasicUserData & ExtendedSessionData & { groups: string[] };

export type ColleagueRequestCtx = RequestCtx<ColleagueContextConfig, ColleagueSessionData>;

export const buildContext: (config: ProcessConfig) => ContextProvider<ColleagueContextConfig, ColleagueSessionData> =
  (config: ProcessConfig) => (req, res) => ({

    identityUserToken: () => {
      const token = getIdentityData<ExtractedUSTData>(res)?.access_token;
      if (!token) {
        throw new Error('identity user scoped token not available!');
      }
      return token;
    },

    identityClientToken: () => {
      const token = getIdentityClientData(res)?.access_token || '';
      if (!token && config.environment !== 'dev') {
        throw new Error('Identity client scoped token not available!');
      }

      return token;
    },

    apiEnv: () => getAppEnv(config.environment, config.mockServerUrl!),

    markApiCall: markApiCall(res),

    sessionData() {
      const openIdData = getUserData<ExtractedOpenIdData>(res);
      const ustData = getIdentityData<ExtractedUSTData>(res);
      if (!openIdData || !ustData) {
        throw new Error('Session data not found!');
      }

      const extendedData = getExtendedSessionData(res);

      return {
        sessionId: openIdData.sid,
        userName: openIdData.fullName,
        userFirstName: openIdData.firstName,
        userEmail: openIdData.email,
        employeeNumber: openIdData.params.employeeNumber,
        colleagueUUID: ustData.uuid,
        branchNumber: extendedData?.branchNumber,
        countryCode: extendedData?.countryCode,
        masteredInLegacy: extendedData?.masteredInLegacy,
        dniGroups: extendedData?.dniGroups || [],
        groups: openIdData.groups,
      };
    },

    config: () => ({
      confirmitPassword: config.confirmitPassword,
    }),

    sendLog: (message) => addCustomLog(res, message),

    hideRequestBodyLog: () => {
      req.body = '[hidden due to sensitive information]';
    },
  });
