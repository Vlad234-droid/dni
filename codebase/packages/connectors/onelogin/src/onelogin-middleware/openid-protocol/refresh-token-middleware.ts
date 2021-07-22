import express from 'express';
import cryptoJS from 'crypto-js';
import { GetPublicKeyOrSecret } from 'jsonwebtoken';
import { Client, Issuer } from 'openid-client';
import jwksClient, { JwksClient } from 'jwks-rsa';

import { asyncHandler } from '@energon/express-middlewares';

import { getDataFromCookie, setDataToCookie } from '../../plugins/utils';
import { AuthData, OpenIdUserInfo, OneloginError } from '../..';
import { OneloginCookieConfig } from '..';
import { Logger, LoggerEvent } from '../../logger';
import { printCookieInfo } from '../../utils';
import { setOpenIdAuthData } from '../../auth-data-extractor';
import { verifyJwt } from '../../jwt-wrapper';

const getKey =
  (client: JwksClient): GetPublicKeyOrSecret =>
  (header, callback): void => {
    client.getSigningKey(header.kid!, (err, key) => {
      if (err) callback(err, undefined);
      //const signingKey = "publicKey" in key ? key.getPublicKey() : key.rsaPublicKey;
      // const signingKey = !!Object.getOwnPropertyDescriptor(key, 'getPublicKey')
      //   ? key.getPublicKey()
      //   : key.rsaPublicKey;

      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    });
  };

export const getRefreshTokenMiddleware = <TClient extends Client>({
  client,
  authDataCookie,
  refreshTokenSecret,
  logger,
  requireIdToken,
  tescoIssuer,
}: {
  client: TClient;
  authDataCookie: Required<OneloginCookieConfig> & { name: string };
  refreshTokenSecret: string;
  logger: Logger;
  requireIdToken: boolean;
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
        `Refresh token middleware: path: ${req.path}, validating auth cookie (${authDataCookie.name})`,
        { req, res },
      ),
    );

    const authData = getDataFromCookie<AuthData>(req, {
      cookieName: authDataCookie.name,
      compressed: true,
    });

    if (!authData) {
      throw new OneloginError('verification', `Cookie not set: ${printCookieInfo('authdata', authDataCookie)}`, 401);
    }

    if (!requireIdToken) {
      logger(LoggerEvent.debug('verification', 'IdToken not required', { req, res }));

      return next();
    }

    const { idToken, encRefreshToken } = authData;

    if (idToken == null || encRefreshToken == null) {
      throw new OneloginError('verification', 'Missing idToken or encRefreshToken', 401);
    }

    const handleTokenValid = () => {
      logger(LoggerEvent.debug('verification', 'IdToken is valid', { req, res }));

      return next();
    };

    const handleTokenExpired = async () => {
      logger(LoggerEvent.debug('verification', 'IdToken expired, refreshing', { req, res }));

      const refreshTokenSet = async () => {
        const refreshToken = cryptoJS.AES.decrypt(encRefreshToken, refreshTokenSecret).toString(cryptoJS.enc.Utf8);

        const refreshedTokenSet = await client.refresh(refreshToken);

        logger(LoggerEvent.debug('verification', 'IdToken token refreshed successfully', { req, res }));

        return refreshedTokenSet;
      };

      const { id_token: newIdToken, refresh_token: newRefreshToken } = await refreshTokenSet();

      if (newIdToken == null || newRefreshToken == null) {
        throw new OneloginError('verification', 'Missing idToken or refreshToken', 401);
      }

      const resolveAuthData = () => {
        const encRefreshToken = cryptoJS.AES.encrypt(newRefreshToken, refreshTokenSecret).toString();

        const newAuthData: AuthData = {
          encRefreshToken: encRefreshToken,
          idToken: newIdToken,
        };

        setOpenIdAuthData(res, newAuthData);
        return newAuthData;
      };

      const authData = resolveAuthData();
      const authDataFromCookie = setDataToCookie(res, authData, {
        signed: authDataCookie.signed,
        cookieName: authDataCookie.name,
        secure: authDataCookie.secure,
        httpOnly: authDataCookie.httpOnly,
        path: authDataCookie.path,
        compressed: true,
      });
      req.signedCookies[authDataCookie.name] = authDataFromCookie;

      logger(
        LoggerEvent.info('verification', 'Refreshed auth cookie set', {
          req,
          res,
        }),
      );

      return next();
    };

    const verifyResult = await verifyJwt<OpenIdUserInfo>(idToken, getKey(jwksClientInstance));

    if (verifyResult.ok) {
      return handleTokenValid();
    } else if (verifyResult.error.name === 'TokenExpiredError') {
      return await handleTokenExpired();
    } else {
      throw new OneloginError('verification', verifyResult.error.message, 401);
    }
  });
};
