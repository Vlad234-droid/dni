import passport from "passport";
import {
  Strategy,
  TokenSet,
  StrategyOptions,
  Client,
  StrategyVerifyCallback,
} from "openid-client";
import express from "express";

export const getStrategy = <C extends Client>(options: StrategyOptions<C>) => {
  const verifyCallback: StrategyVerifyCallback<TokenSet> = (tokenSet, done) => {
    // here we return user informations that will be available
    // at authenticate callback method
    done(null, tokenSet);
  };

  return new Strategy(options, verifyCallback);
};

/** handler which will redirect users to the OpenID provider for authentication. */
export const authenticationHandler: express.Handler = passport.authenticate(
  "oidc",
);

type AuthenticateResult =
  | { ok: true; tokenSet: TokenSet }
  | { ok: false; error: string };

export const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<AuthenticateResult> =>
  new Promise((resolve) => {
    // second argument in method passed to `authenticate` is the same value that we pass to the `done` while creating Strategy
    passport.authenticate(
      "oidc",
      (error: Error, tokenSet: TokenSet | undefined) => {
        if (error) {
          return resolve({
            ok: false,
            error: "passport.authenticate failed: " + error.message,
          });
        }

        if (!tokenSet) {
          return resolve({
            ok: false,
            error: "passport.authenticate failed: tokenSet is missing",
          });
        }

        resolve({ ok: true, tokenSet });
      },
    )(req, res, next);
  });
