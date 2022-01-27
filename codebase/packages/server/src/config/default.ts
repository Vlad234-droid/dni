export const defaultConfig = {
  buildEnvironment: 'production',
  
  applicationName: 'Our Tesco | Diversity and Inclusion',
  applicationUploadSize: 50, // Maximum allowed upload size in MB
  defaultRole: 'Employee',
  port: 9000,

  loggerRootName: 'server',

  oidcGroupFiltersRegex: [/GG-UK-TescoGlobal-DiversityAndInclusion(-[\w\d]+)+/],
  applicationColleagueCookieName: 'tesco.colleague',
  applicationUserDataCookieName: 'tesco.userdata',
  applicationCookieParserSecret: '',
  cacheIdentityTokenKey: 'application.scope.identity.token',
  cacheIdentityTokenTtl: 30 * 60, // 30 min
  cacheColleagueTtl: 5 * 60 * 60, // 5hrs
  oidcAuthCallbackPath: '/sso/auth/callback',
  oidcRedirectAfterLogoutPath: '/sso/logout/callback',
};
