import { Response } from 'express';
import { Client, IntrospectionResponse, UserinfoResponse } from 'openid-client';
import jwt from 'jsonwebtoken';

import { getOpenIdAuthData } from '..';

export interface OpenIdUserInfo extends 
    UserinfoResponse,
    Partial<IntrospectionResponse>,
    Partial<OpenIdUserInfoProfileScope>,
    Partial<OpenIdUserInfoGroupsScope>,
    Partial<OpenIdUserInfoParamsScope> { }

export interface OpenIdUserInfoProfileScope {
  at_hash?: string;
  given_name: string;
  family_name: string;
  custom_fields?: Partial<OpenIdUserInfoCustomFields>;
}

export interface OpenIdUserInfoGroupsScope {
  groups: string[];
}

export interface OpenIdUserInfoParamsScope {
  params: OpenIdUserInfoParams;
}

export interface OpenIdUserInfoParams {
  employeeNumber?: string;
  Surname?: string;
  EmployeeNumber?: string;
  EmployeeID?: string;
  Givenname?: string;
}

export interface OpenIdUserInfoCustomFields {
  Email_or_UPN_Subject: string;
  displayName: string;
  employeeID: string;
  employeeType: string;
  external_id: string;
  employeeNumber: string;
  businessCategory: 'Office' | 'Store' | 'Distribution' | 'Depot' | 'Depots';
}

/**
 * Express middleware, which handles OpenId AuthData
 * @param authTokenCookieName The name of cookie to be used for OpenId AuthData
 * @returns
 */
 export const extractOpenIdUserInfo = async (client: Client, res: Response) => {
    const authData = getOpenIdAuthData(res);

    if (!authData?.accessToken && !authData?.idToken) {
      throw Error('invalid authData: both accessToken and idToken are missing');
    }

    if (authData?.idToken) {
      return jwt.decode(authData?.idToken) as OpenIdUserInfo;
    } else if (authData?.accessToken) {
      return await client.userinfo(authData?.accessToken);
    } else {
      throw Error('No OIDC user info auth data can be extracted');
    }
};
