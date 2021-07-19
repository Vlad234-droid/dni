import { OpenIdUserInfo } from "@dni-connectors/onelogin";
import { ColleagueV2 } from "../../../connectors/colleague-api/build";
import { ProcessConfig } from "./config-accessor";

/**
 * openIdUserInfoResolver
 * @param config 
 * @param src 
 * @returns 
 */
export const openIdUserInfoResolver = (
  { defaultRoles, oidcGroupFiltersRegex, oidcManagerGroups, oidcAdminGroups }: ProcessConfig, 
  src: OpenIdUserInfo) => {

  console.log(` --> OpenID <openIdUserInfoResolver>: [src]: ${JSON.stringify(src)}`);

  const userGroups = (
    Array.isArray(src.groups) ? src.groups : ((src.groups as unknown as string) || '').split(',') || []
  )
  .filter(Boolean)
  .filter((group) => oidcGroupFiltersRegex().some((rr) => rr.test(group)));

  const userRoles: Set<string> = new Set(defaultRoles());

  if (oidcManagerGroups().some((g) => userGroups.includes(g))) {
    userRoles.add('Manager');
  }
  if (oidcAdminGroups().some((g) => userGroups.includes(g))) {
    userRoles.add('Admin');
  }

  //console.log(` --> User roles: [${Array.from(userRoles.values())}]`);

  const getProperty = (obj: any, propName: string) => obj && (obj)[propName];

  const userInfo = {
    //...userInfo,
    fullName: src.name,
    firstName: src.given_name || getProperty(src.params, 'Firstname') || src.name.split(/\s+/)[0],
    lastName: src.family_name || getProperty(src.params, 'Lastname') || src.name.split(/\s+/)[1],
    email: getProperty(src, 'email') || src.preferred_username,
    roles: Array.from(userRoles.values()),
    params: {
      employeeNumber: src.params?.employeeNumber || src.params?.EmployeeNumber,
    },
    // aud: src.aud,
    // sid: src.sid,
    // iat: src.iat,
    // iss: src.iss,
    // sub: src.sub,
    // exp: src.exp,
    updatedAt: src.updated_at,
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
export const colleagueInfoResolver = (
  { }: ProcessConfig, 
  src: ColleagueV2) => {

  console.log(` --> OpenID <colleagueInfoResolver>: [src]: ${JSON.stringify(src)}`);

  const colleagueInfo = {
    ...src
  };

  console.log(` --> OpenID <colleagueInfoResolver>: [result]: ${JSON.stringify(colleagueInfo)}`);

  return colleagueInfo;
};