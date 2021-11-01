export const redirectToAuth = (returnUri?: string) => {
  const redirectToAuth = window.localStorage.getItem('redirectToAuth');

  if (redirectToAuth === null) {
    window.localStorage.setItem('redirectToAuth', new Date().toISOString());

    setTimeout(() => {
      window.localStorage.removeItem('redirectToAuth');
      if (returnUri) {
        window.location.assign(`/sso/auth?onelogin_return_uri=${encodeURI(returnUri)}`);
      } else {
        window.location.assign(`/sso/auth`);
      }
    }, 100);
  }
};
