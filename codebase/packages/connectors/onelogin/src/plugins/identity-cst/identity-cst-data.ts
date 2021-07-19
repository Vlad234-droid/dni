import { Response } from "express";
import { ClientScopeToken } from "../api";

export const getIdentityClientData = (
  res: Response,
): ClientScopeToken | undefined =>
  (res as AugmentedResponse).identityCST as ClientScopeToken | undefined;

export const setIdentityClientData = (
  res: Response,
  clientAppTokenData: ClientScopeToken,
) => {
  (res as AugmentedResponse).identityCST = clientAppTokenData;
};

type AugmentedResponse = Response & {
  identityCST?: unknown;
};
