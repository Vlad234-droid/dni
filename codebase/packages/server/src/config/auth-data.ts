import { OpenIdUserInfo } from '@dni-connectors/onelogin';
import { Colleague } from '@dni-connectors/colleague-api';
import { ProcessConfig } from './config-accessor';

export type DniProfile = {
  fullName?: string;
  firstName: string;
  lastName: string;
  email?: string;
  roles: string[];
  params: {
    employeeNumber?: string;
  };
  updatedAt?: number;
};

/**
 * openIdUserInfoResolver
 * @param config
 * @param src
 * @returns
 */
export const openIdUserInfoResolver = (
  config: Pick<ProcessConfig, 'defaultRoles' | 'oidcGroupFiltersRegex' | 'oidcManagerGroups' | 'oidcAdminGroups'>,
  src: OpenIdUserInfo,
): DniProfile => {
  const { defaultRoles, oidcGroupFiltersRegex, oidcManagerGroups, oidcAdminGroups } = config;
  console.log(` --> OpenID <openIdUserInfoResolver>: [src]: ${JSON.stringify(src)}`);

  const userGroups = (
    Array.isArray(src.groups) ? src.groups : ((src.groups as unknown as string) || '').split(',') || []
  )
    .filter(Boolean)
    .filter((group: string) => oidcGroupFiltersRegex().some((rr) => rr.test(group)));

  const employeeNumber = (src.params?.employeeNumber as string) || (src.params?.EmployeeNumber as string) || undefined;

  const userRoles: Set<string> = new Set(defaultRoles());

  if (oidcManagerGroups().some((g) => userGroups.includes(g))) {
    userRoles.add('Manager');
  }
  if (oidcAdminGroups().some((g) => userGroups.includes(g))) {
    userRoles.add('Admin');
  }

  //console.log(` --> User roles: [${Array.from(userRoles.values())}]`);

  const getProperty = (obj: any, propName: string) => obj && obj[propName];

  const userInfo = {
    //...userInfo,
    fullName: src.name,
    firstName: src.given_name || getProperty(src.params, 'Firstname') || src.name?.split(/\s+/)[0],
    lastName: src.family_name || getProperty(src.params, 'Lastname') || src.name?.split(/\s+/)[1],
    email: getProperty(src, 'email') || src.preferred_username,
    roles: Array.from(userRoles.values()),
    params: {
      employeeNumber,
    },
    // aud: src.aud,
    // sid: src.sid,
    // iat: src.iat,
    // iss: src.iss
    // sub: src.sub,
    // exp: src.exp,
    updatedAt: !isNaN(Number(src.updated_at)) ? Number(src.updated_at) : undefined,
  };

  console.log(` --> OpenID <openIdUserInfoResolver>: [result]: ${JSON.stringify(userInfo)}`);

  return userInfo;
};

/**
 * colleagueInfoResolver
 * @param config
 * @param src
 * @returns
 */
export const colleagueInfoResolver = (config: Pick<ProcessConfig, 'environment' | 'runtimeEnvironment'>, src: Colleague) => {
  console.log(` --> OpenID <colleagueInfoResolver>: [src]: ${JSON.stringify(src)}`);

  const colleagueInfo = {
    ...src,
  };

  console.log(` --> OpenID <colleagueInfoResolver>: [result]: ${JSON.stringify(colleagueInfo)}`);

  return colleagueInfo;
};
