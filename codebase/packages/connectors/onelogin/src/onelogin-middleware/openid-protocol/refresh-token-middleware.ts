import express from 'express';
import cryptoJS from 'crypto-js';
import { GetPublicKeyOrSecret } from 'jsonwebtoken';
import { Client, Issuer, TokenSet } from 'openid-client';
import jwksClient, { JwksClient } from 'jwks-rsa';

import { asyncHandler } from '@dni-common/express-middlewares';
import { validateCookies } from '@energon/cookie-utils';

import { getDataFromCookie, setDataToCookie } from '../../plugins/utils';
import { AuthData, OneloginError } from '../..';
import { OneloginCookieConfig } from '..';
import { Logger, LoggerEvent } from '../../logger';
import { printCookieInfo } from '../../utils';
import { setOpenIdAuthData, OpenIdUserInfo } from '../../oidc-data-extractor';
import { verifyJwt } from '../../jwt-wrapper';
import jwt from 'jsonwebtoken';

const getKey =
  (client: JwksClient): GetPublicKeyOrSecret =>
  (header, callback): void => {
    client.getSigningKey(header.kid!, (err, key) => {
      if (err) {
        callback(err, undefined);
      } else {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
      }
    });
  };

export const getRefreshTokenMiddleware = <TClient extends Client>({
  client,
  authTokenCookie,
  refreshTokenSecret,
  logger,
  requireAccessToken,
  tescoIssuer,
}: {
  client: TClient;
  authTokenCookie: Required<OneloginCookieConfig>;
  refreshTokenSecret: string;
  logger: Logger;
  requireAccessToken: boolean;
  tescoIssuer: Issuer<TClient>;
}): express.Handler => {
  const jwksUri = tescoIssuer.metadata.jwks_uri;

  if (!jwksUri) {
    throw Error('Missing jwksUri');
  }

  const jwksClientInstance = jwksClient({
    jwksUri,
    cache: true,
  });

  return asyncHandler(async (req, res, next) => {
    logger(
      LoggerEvent.info(
        'verification',
        `Refresh token middleware: path: ${req.path}, validating auth cookie (${authTokenCookie.name})`,
        { req, res },
      ),
    );

    const authData = getDataFromCookie<AuthData>(req, {
      cookieName: authTokenCookie.name,
      compressed: true,
    });

    if (!authData) {
      throw new OneloginError('verification', `Cookie not set: ${printCookieInfo('authdata', authTokenCookie)}`, 401);
    }

    if (!requireAccessToken) {
      logger(LoggerEvent.debug('verification', 'accessToken is not required', { req, res }));
      next();
      return;
    }

    const { accessToken, encRefreshToken } = authData;

    if (accessToken == null || encRefreshToken == null) {
      throw new OneloginError('verification', 'Missing accessToken or encRefreshToken', 401);
    }

    const handleTokenValid = () => {
      logger(LoggerEvent.debug('verification', 'accessToken is valid', { req, res }));
    };

    const handleTokenExpired = async () => {
      logger(LoggerEvent.debug('verification', 'accessToken expired, refreshing', { req, res }));

      const refreshToken = cryptoJS.AES.decrypt(encRefreshToken, refreshTokenSecret).toString(cryptoJS.enc.Utf8);
      let newTokenSet: TokenSet;
      try {
        newTokenSet = await client.refresh(refreshToken);
        logger(LoggerEvent.debug('verification', 'tokenset refreshed successfully', { req, res }));
      } catch (e) {
        throw new OneloginError('verification', 'tokenset refresh error', 401);
      }

      if (!newTokenSet.refresh_token || !newTokenSet.access_token || !newTokenSet.id_token) {
        throw new OneloginError('verification', 'missing refreshed authToken, idToken or refreshToken', 401);
      }

      const idTokenData = jwt.decode(newTokenSet.id_token) as OpenIdUserInfo;

      const newAuthData: AuthData = {
        accessToken: newTokenSet.access_token,
        encRefreshToken: cryptoJS.AES.encrypt(newTokenSet.refresh_token, refreshTokenSecret).toString(),
        idToken: newTokenSet.id_token,
        sessionId: idTokenData.sid,
      };

      setOpenIdAuthData(res, newAuthData);

      const newAuthDataInCookie = {
        accessToken: newAuthData.accessToken,
        encRefreshToken: newAuthData.encRefreshToken,
        sessionId: idTokenData.sid,
      };

      const newAuthDataCookieValue = setDataToCookie(res, newAuthDataInCookie, {
        signed: authTokenCookie.signed,
        cookieName: authTokenCookie.name,
        secure: authTokenCookie.secure,
        httpOnly: authTokenCookie.httpOnly,
        path: authTokenCookie.path,
        compressed: true,
      });

      req.signedCookies[authTokenCookie.name] = newAuthDataCookieValue;

      const newValidationStatus = validateCookies({
        ...req.cookies,
        ...req.signedCookies,
        [authTokenCookie.name]: newAuthDataCookieValue,
      });
  
      if (newValidationStatus.valid) {
        logger(LoggerEvent.debug('login', 
          `Following cookies have been refreshed: - ${printCookieInfo(`authdata${requireAccessToken ? '' : ' (empty)'}`, authTokenCookie)}`, 
          { req, res }));

        logger(LoggerEvent.info('verification', 'Refreshed auth cookie set', { req, res }));
      } else {
        logger(LoggerEvent.warn('login', `Auth cookie set may not be refreshed. Cookie validation response: ${newValidationStatus.message}`, { req, res }));
      }
    };

    const verifyResult = await verifyJwt(accessToken, getKey(jwksClientInstance));

    if (verifyResult.ok) {
      handleTokenValid();
      next();
    } else if (verifyResult.error.name === 'TokenExpiredError') {
      await handleTokenExpired();
      next();
    } else {
      throw new OneloginError('verification', verifyResult.error.message, 401);
    }
  });
};
