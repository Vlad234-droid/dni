import express, { Handler, NextFunction } from 'express';
import cryptoJS from 'crypto-js';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import { Issuer, Client } from 'openid-client';
import jwt from 'jsonwebtoken';

import { validateCookies } from '@energon/cookie-utils';
import { asyncHandler } from '@energon/express-middlewares';

import { getDataFromCookie, setDataToCookie } from '../../plugins/utils';
import { OpenIdUserInfo } from '../../oidc-data-extractor';

import {
  AUTHENTICATION_PATH,
  LOGOUT_PATH,
  AUTH_TOKEN_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  ONELOGIN_RETURN_URI_COOKIE_NAME,
  ONELOGIN_RETURN_URI_PARAM,
  defaultCookieConfig,
  IssuerMetadataLight,
  OneloginCookieConfig,
  OpenIdRouter,
  OneloginRouteInfo,
  OneloginError,
} from '..';

import { defaultLogger, LoggerEvent } from '../../logger';
import { Plugin } from '../../plugins';
import { openIdAuthDataMiddleware, AuthData, setOpenIdAuthData, getOpenIdAuthData } from '../../oidc-data-extractor';
import { persistentTracingMiddleware, requestTracingMiddleware } from '../../tracing';
import { errorHandler } from '../../error-handler';
import * as OpenId from '../../passport-wrappers/openid';
import { computeCookieKey, unless, printCookieInfo, emptyIfRoot, addTrailngSlash } from '../../utils';

import { getRefreshTokenMiddleware } from './refresh-token-middleware';
import { OpenidConfig } from './openid-config';

export const initializeOpenidMiddleware = async (configuration: OpenidConfig): Promise<OpenIdRouter> => {
  const {
    runtimeEnvironment = 'production',
    clientId,
    clientSecret,
    cookieKey = computeCookieKey(clientId),
    refreshTokenSecret,
    issuerUrl,
    applicationServerUrlRoot,
    applicationPath = '/',
    registeredAuthCallbackUrlPath,
    registeredRedirectAfterLogoutPath,
    isViewPath,
    scope,
    ignoredPathsFragments = [],
    noRedirectPathFragments = [ '/api' ],
    plugins = [],
    logger = defaultLogger,
    requireAccessToken = false,
  } = configuration;

  //process.env.NODE_ENV === "development" ? false : true;
  const omitUndefinedPeoperties = (obj: any) => {
    const cloned= { ...obj };
    Object.keys(cloned).forEach((key) => cloned[key] === undefined && delete cloned[key]);
    return cloned;
  };

  const authTokenCookie: Required<OneloginCookieConfig> = {
    ...defaultCookieConfig(runtimeEnvironment),
    path: '/',
    name: AUTH_TOKEN_COOKIE_NAME,
    ...omitUndefinedPeoperties(configuration.authTokenCookie),
  };

  const sessionCookie: Required<OneloginCookieConfig> = {
    ...defaultCookieConfig(runtimeEnvironment),
    path: '/',
    name: SESSION_COOKIE_NAME,
    secure: false,
    ...omitUndefinedPeoperties(configuration.sessionCookie),
  };

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
    post_logout_redirect_uris: [ `${applicationServerUrlRoot}${emptyIfRoot(applicationPath)}${registeredRedirectAfterLogoutPath}` ],
  });

  const clearCookies = (res: express.Response) => {
    res
      .clearCookie(authTokenCookie.name, { path: authTokenCookie.path })
      .clearCookie(sessionCookie.name, { path: sessionCookie.path })
      .clearCookie(`${sessionCookie.name}.sig`, { path: sessionCookie.path });
  };

  const authHandler: Handler = (req, res, next) => {
    const returnUri = req.query[ONELOGIN_RETURN_URI_PARAM] || addTrailngSlash(applicationPath);

    logger(
      LoggerEvent.info(
        'login',
        `Authentication path handler was called with return URI: ${returnUri} - clearing cookies and authenticating`,
        { req, res }
      ),
    );

    clearCookies(res);

    if (!req.cookies[ONELOGIN_RETURN_URI_COOKIE_NAME]) {
      const twoMinutes = 2 * 60 * 1000;
      res.cookie(ONELOGIN_RETURN_URI_COOKIE_NAME, returnUri, {
        maxAge: twoMinutes,
        httpOnly: false,
        path: sessionCookie.path,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nextWrapper: NextFunction = (error?: any | 'router' | 'route') => {
      if (error && typeof error === 'object') {
        logger(LoggerEvent.error('login', error, { req, res }));
      } else {
        logger(LoggerEvent.debug('login', 'OpenId authentication complete. Invoking next handler.', { req, res }));
      }

      next(error);
    };

    OpenId.authenticationHandler(req, res, nextWrapper);
  };

  passport.use(
    'oidc',
    OpenId.getStrategy({
      client,
      params: {
        redirect_uri: `${applicationServerUrlRoot}${emptyIfRoot(applicationPath)}${registeredAuthCallbackUrlPath}`,
        scope: scope.join(' '),
      },
    }),
  );

  const router = express.Router();

  router.use((req, res, next) => {
    const cookieSessionOption: CookieSessionInterfaces.CookieSessionOptions = {
      keys: [cookieKey],
      name: sessionCookie.name,
      signed: sessionCookie.signed,
      secure: sessionCookie.secure,
      httpOnly: sessionCookie.httpOnly,
      path: sessionCookie.path,
    }

    cookieSession(cookieSessionOption)(req, res, next);
  });

  router.use(cookieParser(cookieKey));
  router.use(passport.initialize());

  router.use(requestTracingMiddleware);
  router.use(persistentTracingMiddleware);

  router.use(
    openIdAuthDataMiddleware(client, authTokenCookie.name), 
    );

  router.get(AUTHENTICATION_PATH, authHandler);

  const authCallbackHandlerStep1 = asyncHandler(async (req, res, next) => {
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

      const accessToken = authenticateResult.tokenSet.access_token;
      if (accessToken == null) {
        throw new OneloginError('login', 'Missing accessToken', 401);
      }

      const refreshToken = authenticateResult.tokenSet.refresh_token;
      if (refreshToken == null) {
        throw new OneloginError('login', 'Missing refreshToken', 401);
      }

      const idToken = authenticateResult.tokenSet.id_token;
      if (idToken == null) {
        throw new OneloginError('login', 'Missing authToken', 401);
      }

      const idTokenData = jwt.decode(idToken) as OpenIdUserInfo;

      return { accessToken, idToken, refreshToken, sessionId: idTokenData.sid };
    };

    const { accessToken, idToken, refreshToken, sessionId } = await getTokens();

    const encRefreshToken = cryptoJS.AES.encrypt(refreshToken, refreshTokenSecret).toString();

    const authData: AuthData = {
      accessToken,
      idToken,
      encRefreshToken,
      sessionId,
    };

    setOpenIdAuthData(res, authData);

    logger(LoggerEvent.info('login', 'User was correctly authenticated', { req, res }));

    next();
  });

  const authCallbackHandlerStep2Plugins = plugins.map((plugin: Plugin) => {
    return asyncHandler(async (req, res, next) => {
      try {
        logger(LoggerEvent.debug('login', `Running OpenId plugin: ${plugin.info}`, { req, res }));
        await plugin(req, res);
        next();
      } catch (error: any) {
        if (plugin.optional) {
          logger(LoggerEvent.warn('plugin', `Error while executing plugin ${plugin.info}`, { req, res }, error));
          next();
        } else {
          next(new OneloginError('plugin', error.message, error.status));
        }
      }
    });
  });

  const authCallbackHandlerStep3 = asyncHandler(async (req, res) => {
    logger(LoggerEvent.debug('login', 'Create AuthData cookie', { req, res }));

    if (!req.cookies || !req.signedCookies) {
      throw Error('cookie-parser with correct key is required');
    }

    const authData = requireAccessToken ? getOpenIdAuthData(res, true) : {};

    if (!authData || authData?.accessToken == null) {
      throw new OneloginError('login', 'Missing accessToken', 401);
    }

    if (!authData || authData?.encRefreshToken == null) {
      throw new OneloginError('login', 'Missing refreshToken', 401);
    }

    if (!authData || authData?.sessionId == null) {
      throw new OneloginError('login', 'Missing sessionId', 401);
    }

    const authDataInCookie = {
      accessToken: authData.accessToken,
      encRefreshToken: authData.encRefreshToken,
      sessionId: authData.sessionId,
    };

    const authDataCookieValue = setDataToCookie(res, authDataInCookie, {
      signed: authTokenCookie.signed,
      secure: authTokenCookie.secure,
      httpOnly: authTokenCookie.httpOnly,
      cookieName: authTokenCookie.name,
      path: authTokenCookie.path,
      compressed: true,
    });

    const validationStatus = validateCookies({
      ...req.cookies,
      ...req.signedCookies,
      [authTokenCookie.name]: authDataCookieValue,
    });

    if (validationStatus.valid) {
      logger(LoggerEvent.debug('login', 
        `Following cookies have been created: - ${printCookieInfo(`authdata${requireAccessToken ? '' : ' (empty)'}`, authTokenCookie)}`, 
        { req, res }));

      logger(LoggerEvent.info('verification', 'Auth cookie set have beed created', { req, res }));
    } else {
      logger(LoggerEvent.warn('login', `Auth cookie set may not be refreshed. Cookie validation response: ${validationStatus.message}`, { req, res }));
    }

    let returnUriFromCookie: string | undefined = req.cookies[ONELOGIN_RETURN_URI_COOKIE_NAME];

    if (isViewPath) {
      if (returnUriFromCookie) {
        const ajustedUriFromCookie = applicationPath !== '/' ? returnUriFromCookie.replace(RegExp(`^${applicationPath}`), '') : returnUriFromCookie;
        const isView = isViewPath(ajustedUriFromCookie);
        if (isView === false) {
          returnUriFromCookie = undefined;
        }
      }
    }

    res.clearCookie(ONELOGIN_RETURN_URI_COOKIE_NAME, { path: sessionCookie.path });

    const afterLoginRedirect = addTrailngSlash(`${applicationServerUrlRoot}${returnUriFromCookie || applicationPath}`);

    logger(LoggerEvent.debug('login', `User will be redirected to ${afterLoginRedirect}`, { req, res }));

    res.redirect(afterLoginRedirect);
  });

  router.get(registeredAuthCallbackUrlPath, 
    [ authCallbackHandlerStep1, ...authCallbackHandlerStep2Plugins, authCallbackHandlerStep3 ]
  );

  router.get(LOGOUT_PATH, 
    asyncHandler(async (req, res) => {
      logger(LoggerEvent.info('logout', 'Logout handler was called', { req, res }));

      const authData = getDataFromCookie<AuthData>(req, {
        cookieName: authTokenCookie.name,
        compressed: true,
      });

      if (!authData) {
        throw new OneloginError('logout', `Cookie not found: ${authTokenCookie.name} cookie`, 503);
      }

      logger(LoggerEvent.debug('logout', 'Clearing cookies...', { req, res }));
      clearCookies(res);
    
      const { accessToken, encRefreshToken } = authData;

      if (accessToken && encRefreshToken) {
        logger(LoggerEvent.debug('logout', 'Revoking tokens...', { req, res }));
        const refreshToken = cryptoJS.AES.decrypt(encRefreshToken, refreshTokenSecret).toString(cryptoJS.enc.Utf8);
        await client.revoke(refreshToken, 'refresh_token');

        logger(LoggerEvent.debug('logout', `Redirecting user to onelogin logout. Post logout URL: ${registeredRedirectAfterLogoutPath}`, { req, res }));
        const afterLogoutRedirectCallbackUrl = client.endSessionUrl({ id_token_hint: accessToken });
        return res.redirect(afterLogoutRedirectCallbackUrl);
      } else {
        throw new OneloginError('logout', `access_token is missing in ${authTokenCookie.name} cookie`, 503);
      }
    }
  ));

  router.get(registeredRedirectAfterLogoutPath, (req, res) => {
    logger(LoggerEvent.info('post-logout', 'Post logout redirect URI handler was called', { req, res }));

    const afterLogoutRedirect = addTrailngSlash(`${applicationServerUrlRoot}${applicationPath}`);

    logger(LoggerEvent.debug('post-logout', `User will be redirected to: ${afterLogoutRedirect}`, { req, res }));
    res.redirect(afterLogoutRedirect);
  });

  const allIgnoredPaths = [
    ...ignoredPathsFragments, 
    AUTHENTICATION_PATH, 
    LOGOUT_PATH, 
    registeredAuthCallbackUrlPath
  ];

  router.use(
    unless(
      [...allIgnoredPaths],
      getRefreshTokenMiddleware({
        client,
        authTokenCookie,
        refreshTokenSecret,
        logger,
        requireAccessToken,
        tescoIssuer,
      }),
    ),
  );

  for (const plugin of authCallbackHandlerStep2Plugins) {
    router.use(unless([...allIgnoredPaths], plugin));
  }

  router.use(errorHandler({ applicationPath, noRedirectPathFragments, clearCookies, logger }));

  const oneloginRouter: OpenIdRouter = Object.assign(router, {
    oneloginRoutes: {
      authenticationPath: AUTHENTICATION_PATH,
      logoutPath: LOGOUT_PATH,
      registeredAuthCallbackUrlPath,
      registeredRedirectAfterLogoutPath,
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
