import jwt, {
  GetPublicKeyOrSecret,
  Secret,
  VerifyOptions,
  VerifyErrors,
} from 'jsonwebtoken';

export type VerifyResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: VerifyErrors };

export const verifyJwt = <T>(
  jwtToken: string,
  secret: Secret | GetPublicKeyOrSecret,
  options?: VerifyOptions,
): Promise<VerifyResult<T>> =>
  new Promise((resolve) => {
    jwt.verify(jwtToken, secret, options, (error, result: unknown) => {
      if (error == null) {
        resolve({ ok: true, value: result as T });
      } else {
        resolve({ ok: false, error });
      }
    });
  });
