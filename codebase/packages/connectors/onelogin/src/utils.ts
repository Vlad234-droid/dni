import cryptoJS from "crypto-js";
import { Handler } from "express";

export const computeCookieKey = (clientId: string): string =>
  cryptoJS.MD5(clientId).toString();

export const unless = (paths: string[], middleware: Handler): Handler => (
  req,
  res,
  next,
) => {
  if (paths.some((pathFragment) => req.originalUrl.includes(pathFragment))) {
    next();
  } else {
    middleware(req, res, next);
  }
};

export const printCookieInfo = (
  description: string,
  {
    name,
    path = "/",
    maxAge,
    httpOnly,
    secure,
  }: {
    name: string;
    secure: boolean;
    httpOnly: boolean;
    path?: string;
    maxAge?: number;
  },
) =>
  `${description} - { name: ${name}, path: ${path}, maxAge: ${
    maxAge ? maxAge + "ms" : "session"
  }, secure: ${secure}, httpOnly: ${httpOnly} }`;

export const addTrailngSlash = (u: string): string => {
  return u.endsWith('/') ? u : `${u}/`;
}

export const emptyIfRoot = (u: string): string => {
  return u === '/' ? '' : u;
}