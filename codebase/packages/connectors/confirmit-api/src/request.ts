import { RequestCtx } from '@dni-common/connector-utils';

import { ConfirmitConfig } from './connector';
import { resolveReportConfig } from './constants';

export const getLogonRequestBody = (ctx: Pick<RequestCtx<ConfirmitConfig>, 'apiEnv' | 'config'>): string => {
  const username = resolveReportConfig(ctx).user;
  const { confirmitPassword } = ctx.config();

  return ctx.apiEnv().name === 'LOCAL'
    ? ''
    : `
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
        <LogOnUser xmlns="http://firmglobal.com/Confirmit/webservices/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
          <username>${username}</username>
          <password>${confirmitPassword}</password>
        </LogOnUser>
      </s:Body>
    </s:Envelope>
  `;
};

export const getReportingRequestBody = (
  ctx: Pick<RequestCtx, 'apiEnv' | 'sessionData' | 'sendLog'>,
  authKey: string,
): string => {
  const config = resolveReportConfig(ctx);

  const userName = ctx.sessionData().employeeNumber;
  const reportNumber = config.id;
  const enduserListId = config.enduserListId;

  ctx.sendLog({
    message: 'creating confirmit ReportingRequestBody XML...',
    userName,
    reportNumber,
    enduserListId,
  });

  return ctx.apiEnv().name === 'LOCAL'
    ? ''
    : `
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
        <GetReportPermissions xmlns="http://firmglobal.com/Confirmit/webservices/reporting/27-03-2008">
          <request xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <AuthenticationKey>${authKey}</AuthenticationKey>
            <ReportNumber>${reportNumber}</ReportNumber>
            <UserType>Enduser</UserType>
            <Filter>
              <UserIds i:nil="true" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays"/>
              <Role i:nil="true"/>
              <EnduserListId>${enduserListId}</EnduserListId>
              <PermissionType>NotSet</PermissionType>
              <UserName>${userName}</UserName>
            </Filter>
          </request>
        </GetReportPermissions>
      </s:Body>
    </s:Envelope>
  `;
};
