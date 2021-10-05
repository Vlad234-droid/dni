import { PUBLIC_URL } from '../config/constants';

export const redirectToAuth = (returnUri?: string) => {
  const redirectToAuth = window.localStorage.getItem('redirectToAuth');

  if (redirectToAuth === null) {
    window.localStorage.setItem('redirectToAuth', new Date().toISOString());

    setTimeout(() => {
      window.localStorage.removeItem('redirectToAuth');
      window.location.assign(`/sso/auth?onelogin_return_uri=${encodeURI(returnUri || PUBLIC_URL)}`);
    }, 100);
  }
};
