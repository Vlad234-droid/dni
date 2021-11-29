import express from 'express';
import jwt from 'jsonwebtoken';
import { AuthData, OpenIdUserInfo, setOpenIdAuthData } from '@dni-connectors/onelogin';

const USER_KEY = 'employeeNumber';

export const fakeUserExtractor: express.Handler = (req, res, next) => {
  if (!req.query.employeeNumber) {
    const employeeNumber = req.cookies[USER_KEY] as string;

    const fakeAuthData = buildFakeAuth(
      buildFakeUserInfo(employeeNumber),
      );

    setOpenIdAuthData(res, fakeAuthData);

    next();
    return;
  }

  res.cookie(USER_KEY, req.query[USER_KEY], {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  });

  // redirecting to the URL without the employeeNumber parameter
  return res.redirect(req.path);
};

const generateFakeTokens = (iamId: string = 'UK38011111'): AuthData => {

}
const buildFakeUserInfo = (employeeNumber = 'UK45006148'): OpenIdUserInfo => ({
  sub: 'fake-openid',
  preferred_username: 'AD',
  name: 'Arthur Dent',
  at_hash: '111',
  sid: '427',
  iss: 'https://fake.onelogin.com/oidc/2',
  iat: 1580902408,
  exp: 4736576008,
  aud: '9a6d6350-2af8-0136-197b-06acc76d34b492920',
  params: {
    employeeNumber,
  },
});


const buildFakeAuth = (userInfo: OpenIdUserInfo): AuthData => {
  const accessToken = jwt.sign(userInfo, 'secret');

  return {
    accessToken,
    idToken: accessToken, // TODO: reimplement
    encRefreshToken: 'FakeEncRefreshToken',
    sessionId: userInfo.sid,
  };
};
