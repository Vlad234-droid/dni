export const defaultConfig = {
  applicationName: 'Diversity-And-Inclusion',
  applicationUploadSize: 50, // Maximum allowed upload size in MB
  defaultRole: 'Employee',
  port: 9000,
  oidcGroupFiltersRegex: [/GG-UK-TescoGlobal-DiversityAndInclusion(-[\w\d]+)+/],
  applicationColleagueCookieName: 'tesco.colleague',
  applicationUserDataCookieName: 'tesco.userdata',
  applicationCookieParserSecret: '',
  cacheIdentityTokenKey: 'application.scope.identity.token',
  cacheIdentityTokenTtl: 1800, // 30 min
  cacheColleagueTtl: 18000, // 5hrs
};
