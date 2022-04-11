import { Handler } from 'express';
import yn from 'yn';
import jwt, { GetPublicKeyOrSecret, Secret, VerifyOptions, VerifyErrors, decode, JwtPayload } from 'jsonwebtoken';

const { CEP_TOKEN_SUBJECT: cepTokenSubject } = process.env;

type VerifyResult<T> = { ok: true; value: T } | { ok: false; error: VerifyErrors };

type Result = {
  subject: string;
};

const verify = <T = Result>(
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

const decodeToken = (jwtToken: string): null | JwtPayload | string => {
  return decode(jwtToken) as JwtPayload;
};

const cepAuth: Handler = async (req, res, next) => {
  const jwtToken = (req.headers?.authorization || '').replace('Bearer', '').trim();

  if (yn(process.env.LOGGER_LOG_AUTHTOKEN, { default: false })) {
    console.log('jwtToken-->', jwtToken);
  }

  const result = decodeToken(jwtToken);

  if (!result && result?.sub != cepTokenSubject) {
    res.status(403).send('Forbidden');
    return;
  }

  next();
};

export { cepAuth, verify };