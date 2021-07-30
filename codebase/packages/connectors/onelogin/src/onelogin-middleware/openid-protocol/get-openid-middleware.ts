import express, { NextFunction } from 'express';
import cryptoJS from 'crypto-js';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { Issuer, Client } from 'openid-client';

import { validateCookies } from '@energon/cookie-utils';
import { asyncHandler } from '@energon/express-middlewares';

import { setDataToCookie } from '../../plugins/utils';
import {
  AUTHENTICATION_PATH,
  LOGOUT_PATH,
  AUTH_DATA_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  OneloginCookieConfig,
  defaultCookieConfig,
  OpenIdRouter,
  IssuerMetadataLight,
  OneloginRouteInfo,
  OneloginError } from '../';

import { defaultLogger, Logger, LoggerEvent } from '../../logger';

import { getRefreshTokenMiddleware } from './refresh-token-middleware';

import { openIdAuthDataMiddleware, AuthData, setOpenIdAuthData, getOpenIdAuthData } from '../../auth-data-extractor';

import { persistentTracingMiddleware, requestTracingMiddleware } from '../../tracing';

import { errorHandler } from '../../error-handler';
import { computeCookieKey, unless, printCookieInfo } from '../../utils';
import * as OpenId from '../../passport-wrappers/openid';

import { Plugin } from '../../plugins';


type SupportedScopes = 'openid' | 'profile' | 'email' | 'address' | 'phone' | 'offline_access' | 'params' | 'groups';

export type OpenidConfig = {
  /** The OneLogin generated Client ID for your OpenID Connect app */
  clientId: string;

  /** The OneLogin generated Client Secret for your OpenID Connect app */
  clientSecret: string;

  /** Client secret used to encrypt refresh token */
  refreshTokenSecret: string;

  /** A key used to sign & verify cookie values */
  cookieKey?: string;

  /** issuer url e.g. https://login.ourtesco.com/oidc/2 */
  issuerUrl: string;

  /** A callback root that was registered for the application e.g. https://ourtesco.com (without the applicationPath) */
  registeredCallbackUrlRoot: string;

  /** A callback path that was registered for the application e.g. /auth/openid/callback */
  registeredCallbackUrlPath: string;

  /** Scopes of the data that we want to be present in the id_token */
  scope: readonly ['openid', ...SupportedScopes[]];

  /**
   * A path the app is mounted on e.g. for https://ourtesco.com/my-shift the path is /my-shift.
   * If the app is mounted on root path do not provide this option.
   */
  applicationPath?: string;

  /**
   * Paths that won't be part of token validation and refreshing
   */
  ignoredPathsFragments?: string[];

  /**
   * In case of error, calls containg that path framgents won't result in redirect.
   * Instead middleware will return an error with correct status. Could be used for AJAX calls.
   */
  noRedirectPathFragments?: string[];

  /** Optional, auth data cookie configuration */
  authDataCookie?: OneloginCookieConfig;

  /** Optional, session cookie configuration */
  sessionCookie?: OneloginCookieConfig;

  /**
   * Middleware functions called inside onelogin middleware.
   * They have access to user info and auth data from thier respective getters (getOpenIdUserInfo, getOpenIdAuthData, getSamlUserInfo).
   * Throwing error will be logged, but won't cause the signing in to crash.
   * Will be called while authenticating and with every non ignored requests.
   */
  plugins?: Plugin[];

  /** Optional, callback that will be called with Event type objects durring authentication process */
  logger?: Logger;

  /** If true sets idToken and encRefreshToken in 'authData' cookie. */
  requireIdToken?: boolean;

  /**
   * Absolute url that we will redirect to after logout, that can lead to onelogin session termination ednpoint .
   * Default: `${applicationPath}/sso/auth`
   */
  redirectAfterLogoutUrl?: string;
};

export const getOpenidMiddleware = async (configuration: OpenidConfig): Promise<OpenIdRouter> => {
  const {
    clientId,
    clientSecret,
    cookieKey = computeCookieKey(clientId),
    refreshTokenSecret,
    issuerUrl,
    registeredCallbackUrlRoot,
    registeredCallbackUrlPath,
    scope,
    applicationPath = '',
    ignoredPathsFragments = [],
    noRedirectPathFragments = ['/api'],
    plugins = [],
    logger = defaultLogger,
    requireIdToken = false,
    redirectAfterLogoutUrl,
  } = configuration;

  //process.env.NODE_ENV === "development" ? false : true;
  const omitUndefined = (obj: any) => {
    const cloned = { ...obj };
    Object.keys(cloned).forEach(key => cloned[key] === undefined && delete cloned[key]);
    return cloned;
  };

  const authDataCookie: Required<OneloginCookieConfig> = {
    ...defaultCookieConfig(process.env.NODE_ENV),
    path: '/',
    name: AUTH_DATA_COOKIE_NAME,
    ...omitUndefined(configuration.authDataCookie),
  };

  // if (authDataCookie.name === undefined || authDataCookie.name === null) {
  //   authDataCookie.name = AUTH_DATA_COOKIE_NAME;
  // }
  // if (authDataCookie.path === undefined) {
  //   authDataCookie.path = '/';
  // }

  const sessionCookie: Required<OneloginCookieConfig> = {
    ...defaultCookieConfig(process.env.NODE_ENV),
    path: '/',
    name: SESSION_COOKIE_NAME,
    secure: false,
    ...omitUndefined(configuration.sessionCookie),
  };

  // if (sessionCookie.name === undefined || sessionCookie.name === null) {
  //   sessionCookie.name = SESSION_COOKIE_NAME;
  // }
  // if (sessionCookie.path === undefined) {
  //   sessionCookie.path = '/';
  // }

  const allIgnoredPaths = [...ignoredPathsFragments, AUTHENTICATION_PATH, LOGOUT_PATH, registeredCallbackUrlPath];

  // alternatively, this middleware could be synchronous
  // in that case we should create issuer by manually passing all required endpoints
  // those ulrs can be found in https://openid-connect-eu.onelogin.com/oidc/.well-known/openid-configuration

  // const tescoIssuer = new Issuer({
  //   issuer: "https://openid-connect-eu.onelogin.com/oidc/",
  //   authorization_endpoint: "https://openid-connect-eu.onelogin.com/oidc/auth",
  //   token_endpoint: "https://openid-connect-eu.onelogin.com/oidc/token",
  //   userinfo_endpoint: "https://openid-connect-eu.onelogin.com/oidc/me",
  //   jwks_uri: "https://openid-connect-eu.onelogin.com/oidc/certs",
  // })

  const discoverIssuer = async (issuerUrl: string) => {
    try {
      return await Issuer.discover(issuerUrl);
    } catch (e) {
      //We catch and throw another error because the default one had almost no information in it
      throw Error("Issuer couldn't be discovered");
    }
  };

  const tescoIssuer = await discoverIssuer(issuerUrl);

  const client = new tescoIssuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
    token_endpoint_auth_method: 'client_secret_post',
  });

  passport.use(
    'oidc',
    OpenId.getStrategy({
      client,
      params: {
        redirect_uri: `${registeredCallbackUrlRoot}${applicationPath}${registeredCallbackUrlPath}`,
        scope: scope.join(' '),
      },
    }),
  );

  const router = express.Router();

  router.use((req, res, next) =>
    cookieSession({
      keys: [cookieKey],
      name: sessionCookie.name,
      signed: sessionCookie.signed,
      secure: sessionCookie.secure,
      httpOnly: sessionCookie.httpOnly,
      path: sessionCookie.path,
    })(req, res, next),
  );

  router.use(cookieParser(cookieKey));
  router.use(passport.initialize());

  router.use(requestTracingMiddleware);
  router.use(persistentTracingMiddleware);

  router.use(openIdAuthDataMiddleware(authDataCookie.name));

  const clearCookies = (res: express.Response) => {
    res
      .clearCookie(authDataCookie.name, { path: authDataCookie.path })
      .clearCookie(sessionCookie.name, { path: sessionCookie.path })
      .clearCookie(`${sessionCookie.name}.sig`, { path: sessionCookie.path });
  };

  router.get(AUTHENTICATION_PATH, (req, res, next) => {
    logger(
      LoggerEvent.info('login', 'Authentication path handler was called - clearing cookies and authenticating', {
        req,
        res,
      }),
    );

    clearCookies(res);

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const nextWrapper: NextFunction = (error?: any | 'router' | 'route') => {
      if (error && typeof error === 'object') {
        logger(LoggerEvent.error('login', error, { req, res }));
      } else {
        logger(LoggerEvent.debug('login', 'OpenId authentication complete. Invoking next handler.', { req, res }));
      }

      next(error);
    };

    OpenId.authenticationHandler(req, res, nextWrapper);
  });

  const callbackPathHandler = asyncHandler(async (req, res, next) => {
    logger(LoggerEvent.info('login', 'Redirect URI handler was called', { req, res }));

    if (req.query && req.query.error != null) {
      let errorMsg = req.query.error;
      if (req.query.error_description) {
        errorMsg += `: ${req.query.error_description}`;
      }
      throw new OneloginError('login', errorMsg as string, req.query.error === 'access_denied' ? 403 : undefined);
    }

    const getTokens = async () => {
      const authenticateResult = await OpenId.authenticate(req, res, next);

      if (!authenticateResult.ok) {
        throw new OneloginError('login', authenticateResult.error);
      }

      const refreshToken = authenticateResult.tokenSet.refresh_token;
      if (refreshToken == null) {
        throw new OneloginError('login', 'Missing refreshToken', 401);
      }

      const idToken = authenticateResult.tokenSet.id_token;
      if (idToken == null) {
        throw new OneloginError('login', 'Missing idToken', 401);
      }

      return { refreshToken, idToken };
    };

    const { idToken, refreshToken } = await getTokens();

    const setAuthData = () => {
      const encRefreshToken = cryptoJS.AES.encrypt(refreshToken, refreshTokenSecret).toString();

      const authData: AuthData = {
        encRefreshToken: encRefreshToken,
        idToken: idToken,
      };

      setOpenIdAuthData(res, authData);
    };

    setAuthData();

    logger(
      LoggerEvent.info('login', 'User was correctly authenticated', {
        req,
        res,
      }),
    );

    next();
  });

  const createCookie = asyncHandler(async (req, res, next) => {
    logger(LoggerEvent.debug('login', 'Create AuthData cookie', { req, res }));

    if (!req.cookies || !req.signedCookies) {
      throw Error('cookie-parser with correct key is required');
    }

    const authData = requireIdToken ? getOpenIdAuthData(res, true) : {};

    const authDataInCookie = setDataToCookie(res, authData!, {
      signed: authDataCookie.signed,
      secure: authDataCookie.secure,
      httpOnly: authDataCookie.httpOnly,
      cookieName: authDataCookie.name,
      path: authDataCookie.path,
      compressed: true,
    });

    const validationStatus = validateCookies({
      ...req.cookies,
      ...req.signedCookies,
      [authDataCookie.name]: authDataInCookie,
    });

    if (!validationStatus.valid) {
      logger(LoggerEvent.warn('login', `Cookie validation reponse: ${validationStatus.message}`, { req, res }));
    }

    const afterLoginRedirect = applicationPath || '/';

    logger(
      LoggerEvent.debug(
        'login',
        `Following cookies have been created:
          - ${printCookieInfo(`authdata${requireIdToken ? '' : ' (empty)'}`, authDataCookie)}

          User will be redirected to ${afterLoginRedirect}`,
        { req, res },
      ),
    );

    res.redirect(afterLoginRedirect);
  });

  const wrappedPlugins = plugins.map((plugin: Plugin) => {
    return asyncHandler(async (req, res, next) => {
      try {
        logger(LoggerEvent.debug('login', `Running OpenId plugin: ${plugin.info}`, { req, res }));
        await plugin(req, res);
        next();
      } catch (error) {
        if (plugin.optional) {
          logger(LoggerEvent.warn('plugin', `Error while executing plugin ${plugin.info}`, { req, res }, error));
          next();
        } else {
          next(new OneloginError('plugin', error.message, error.status));
        }
      }
    });
  });

  router.get(registeredCallbackUrlPath, [callbackPathHandler, ...wrappedPlugins, createCookie]);

  router.get(LOGOUT_PATH, (req, res) => {
    logger(
      LoggerEvent.info('logout', 'Clearing cookies and logging out...', {
        req,
        res,
      }),
    );

    clearCookies(res);

    const afterLogoutRedirectUrl = redirectAfterLogoutUrl || `${applicationPath}${AUTHENTICATION_PATH}`;

    logger(LoggerEvent.info('logout', `User will be redirected to the ${afterLogoutRedirectUrl}`, { req, res }));

    return res.redirect(afterLogoutRedirectUrl);
  });

  router.use(
    unless(
      [...allIgnoredPaths],
      getRefreshTokenMiddleware({
        client,
        authDataCookie,
        refreshTokenSecret,
        logger,
        requireIdToken,
        tescoIssuer,
      }),
    ),
  );

  for (const plugin of wrappedPlugins) {
    router.use(unless([...allIgnoredPaths], plugin));
  }

  router.use(errorHandler({ applicationPath, noRedirectPathFragments, clearCookies, logger }));

  const oneloginRouter: OpenIdRouter = Object.assign(router, {
    oneloginRoutes: {
      authenticationPath: AUTHENTICATION_PATH,
      logoutPath: LOGOUT_PATH,
      registeredCallbackUrlPath,
    } as OneloginRouteInfo,
    issuerMetadata: extractMetadataFromIssuer(tescoIssuer),
  });

  return oneloginRouter;
};

const extractMetadataFromIssuer = ({ metadata }: Issuer<Client>): IssuerMetadataLight => {
  const notAvailable = 'not available';
  return {
    issuer: metadata.issuer,
    authorizationEndpoint: metadata.authorization_endpoint ?? notAvailable,
    userinfoEndpoint: metadata.userinfo_endpoint ?? notAvailable,
    tokenEndpoint: metadata.token_endpoint ?? notAvailable,
    jwksUri: metadata.jwks_uri ?? notAvailable,
  };
};
