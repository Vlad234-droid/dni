import { OpenIdUserInfo } from '@dni-connectors/onelogin';
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
 * dniUserDataResolver
 * @param config
 * @param src
 * @returns
 */
export const dniUserDataResolver = (
  config: Pick<ProcessConfig, 'defaultRoles' | 'oidcGroupFiltersRegex' | 'oidcManagerGroups' | 'oidcAdminGroups'>,
  src: OpenIdUserInfo,
): DniProfile => {
  const { defaultRoles, oidcGroupFiltersRegex, oidcManagerGroups, oidcAdminGroups } = config;

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

  if (
    oidcAdminGroups().some((g) => userGroups.includes(g)) ||
    ['UKE12375178', 'UKE12375181'].some((adminEmployeeNumber) => adminEmployeeNumber === employeeNumber)
  ) {
    userRoles.add('Admin');
  }

  const getProperty = (obj: any, propName: string) => obj && obj[propName];

  const userInfo = {
    fullName: src.name,
    firstName: src.given_name || getProperty(src.params, 'Firstname') || src.name?.split(/\s+/)[0],
    lastName: src.family_name || getProperty(src.params, 'Lastname') || src.name?.split(/\s+/)[1],
    email: getProperty(src, 'email') || src.preferred_username,
    roles: Array.from(userRoles.values()),
    params: {
      employeeNumber,
    },
    updatedAt: !isNaN(Number(src.updated_at)) ? Number(src.updated_at) : undefined,
  };

  return userInfo;
};
