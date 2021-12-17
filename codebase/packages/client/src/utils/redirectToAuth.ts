export const redirectToAuth = (returnUri?: string) => {
  const applicationRootPrefix = process.env.PUBLIC_URL ?? '';
  const redirectToAuthKey = `${applicationRootPrefix}/redirectToAuth`;
  const redirectToAuth = window.localStorage.getItem(redirectToAuthKey);

  if (redirectToAuth === null) {
    window.localStorage.setItem(redirectToAuthKey, new Date().toISOString());

    setTimeout(() => {
      window.localStorage.removeItem(redirectToAuthKey);
      if (returnUri) {
        window.location.assign(`${applicationRootPrefix}/sso/auth?onelogin_return_uri=${encodeURI(returnUri)}`);
      } else {
        window.location.assign(`${applicationRootPrefix}/sso/auth`);
      }
    }, 100);
  }
};
