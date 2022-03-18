import { Handler } from 'express';

import jwt, { GetPublicKeyOrSecret, Secret, VerifyOptions, VerifyErrors } from 'jsonwebtoken';

const { CEP_TOKEN_SUBJECT: cepTokenSubject, CEP_TOKEN_SECRET: cepTokenSecret } = process.env;

type VerifyResult<T> = { ok: true; value: T } | { ok: false; error: VerifyErrors };

type Result = {
  subject: string;
};

const verify = <T>(
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

const sign = (payload: string | Buffer | object, secret: Secret): string => {
  return jwt.sign(payload, secret, { expiresIn: 120 });
};

const injectToken: Handler = (req, _, next) => {
  req.headers.authorization = sign({ subject: cepTokenSubject }, cepTokenSecret!);

  next();
};

const cepAuth: Handler = async (req, res, next) => {
  const token = req.headers.authorization!;
  const result = await verify<Result>(token, cepTokenSecret!);

  if (!result.ok || (result.ok && result.value.subject !== cepTokenSubject)) {
    res.status(401).send('Unauthorized');
    return;
  }

  next();
};

export { cepAuth, injectToken };
