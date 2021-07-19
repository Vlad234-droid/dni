import { Response, Request, NextFunction, Handler } from "express";
import { markApiCall } from "@energon/splunk-logger";
import { ClientScopeToken, ClientTokenIssueBody, getIdentityApi } from "../api";
import {
  getIdentityClientData,
  setIdentityClientData,
} from "./identity-cst-data";
import { getMaxAge } from "../utils";
import { Optional } from "../plugin";

type Config = {
  /**
   * A concatenation of the identity client id and identity secret in the following shape:
   * {identityClientId}:{identityClientSecret}
   */
  identityIdAndSecret: string;
  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;
  /**
   * API base url
   * E.g.https://api-ppe.tesco.com
   */
  baseUrl?: string;
  /**
   * Endpoint path
   * E.v. /identity/v4/issue-token/token
   */
  path?: string;
  /**
   * optional, if true, token will be cashed on server and shared between sessions
   * defaults to true
   */
  cache?: boolean;
};

/**
 * A plugin middleware to be used in onelogin.
 * It issues identity Client Scoped Token.
 */
export const identityClientScopedTokenPlugin = (
  config: Config & Optional,
): Handler => {
  const plugin = async (req: Request, res: Response, next: NextFunction) => {
    const {
      identityIdAndSecret,
      shouldRun = () => true,
      baseUrl = process.env.NODE_CONFIG_ENV === "prod"
        ? "https://api.tesco.com"
        : "https://api-ppe.tesco.com",
      path = "/identity/v4/issue-token/token",
      cache = true,
    } = config;

    if (getIdentityClientData(res) || !shouldRun(req, res)) return next();

    if (cache) {
      const cachedToken = getCachedCST();
      if (cachedToken !== null) {
        setIdentityClientData(res, cachedToken);
        return next();
      }
    }

    const credentials = Buffer.from(identityIdAndSecret).toString("base64");
    const body: ClientTokenIssueBody = { grant_type: "client_credentials" };
    const headerProvider = {
      Authorization: () => `Basic ${credentials}`,
      Accept: () =>
        "application/vnd.tesco.identity.tokenresponse.v4claims+json",
    };

    const api = getIdentityApi(headerProvider, baseUrl, path, markApiCall(res));
    const { data } = await api.issueToken({ body });

    setIdentityClientData(res, data);

    if (cache) {
      setCachedCST(data, getMaxAge(data.claims));
    }

    return next();
  };
  plugin.optional = config.optional || false;
  return plugin;
};

const [getCachedCST, setCachedCST] = ((): [
  () => ClientScopeToken | null,
  (newToken: ClientScopeToken, age: number) => void,
] => {
  let cashedCST: ClientScopeToken | null = null;

  return [
    () => cashedCST,
    (newCST, maxAge) => {
      cashedCST = newCST;
      setTimeout(() => {
        cashedCST = null;
      }, maxAge);
    },
  ];
})();
