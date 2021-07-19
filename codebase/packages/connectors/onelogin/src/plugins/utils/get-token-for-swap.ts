import { Response } from "express";
import { Strategy } from "../identity-swap";
import { OneloginError } from "../..";
import { getOpenIdAuthData } from "../../auth-data-extractor";

/**
 * Returns token used in identity token swap endpoint.
 *
 * @param res Express response object
 * @param strategy Onelogin strategy: oidc or saml
 */
export const getIdentitySwapToken = (res: Response, strategy: Strategy) => {
  if (strategy !== 'oidc') {
    throw new OneloginError('other', `Unsupported strategy: ${strategy}`);
  }

  const { idToken: oidcToken } = getOpenIdAuthData(res);
  if (!oidcToken) throw Error("No id token found");
  return oidcToken;
};
