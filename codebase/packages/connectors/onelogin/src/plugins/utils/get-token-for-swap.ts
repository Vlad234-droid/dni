import { Response } from 'express';
import { Strategy } from '../identity-swap';
import { OneloginError } from '../..';
import { getOpenIdAuthData } from '../../oidc-data-extractor';

/**
 * Returns token used in identity token swap endpoint.
 *
 * @param res Express response object
 * @param strategy Onelogin strategy: `oidc` is the only one is supported now
 */
export const getIdentitySwapToken = (res: Response, strategy: Strategy) => {
  if (strategy !== 'oidc') {
    throw new OneloginError('other', `Unsupported OneLogin strategy: ${strategy}`);
  }

  const { accessToken: oidcToken } = getOpenIdAuthData(res, false) || {};
  if (!oidcToken) {
    throw Error('No open-id token found');
  }

  return oidcToken;
};
