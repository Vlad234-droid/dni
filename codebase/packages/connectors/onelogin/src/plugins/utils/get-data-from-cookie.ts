import { Request } from "express";
import { pipe } from "@energon/function-utils";
import { decompress } from "./compression";
import { decrypt } from "./encryption";

/*
 * getDataFromCookie configuration object
 *
 * @param cookieName Name of the cookie from which data should be retrived
 * @param secret optional, If passed it will be used to decrypt the cookie value
 * @param compressed optional, if set to true cookie content will be compressed
 */
type Config = {
  cookieName: string;
  secret?: string;
  compressed?: boolean;
};

/**
 * Returns the data saved as encrypted string in the given cookie.
 *
 * @param req Express request object
 * @param config Configuration object with cookie parameters
 */
export const getDataFromCookie = <T>(
  req: Request,
  config: Config,
): T | undefined => {
  const { cookieName, secret, compressed } = config;
  const cookie = req.signedCookies[cookieName] || req.cookies[cookieName];
  if (!cookie) {
    return undefined;
  }

  try {
    const unfoldedData = pipe(
      cookie,
      decrypt(secret || ''),
      decompress(!!compressed),
    );

    return secret || compressed
      ? JSON.parse(unfoldedData as string)
      : unfoldedData;
  } catch (e: any) {
    throw Error(
      `Cookie value can not be extracted! cookie name - '${cookieName}', error message - '${e.message}'`
    );
  }
};
