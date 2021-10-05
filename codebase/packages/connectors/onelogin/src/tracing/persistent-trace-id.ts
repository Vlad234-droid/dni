import { Response, RequestHandler } from "express";
import { sessionCookies } from "@energon/cookie-utils";

const PERSISTENT_TRACE_KEY = "onelogin.persistent.trace";

const isProdEnv = () => process.env.NODE_ENV === "production";

export const persistentTracingMiddleware: RequestHandler = sessionCookies({
  cookieSession: {
    cookieName: PERSISTENT_TRACE_KEY,
    httpOnly: true,
    secure: isProdEnv(),
  },
});

export const getPersistentTraceId = (res: Response): string | undefined =>
  res.locals[PERSISTENT_TRACE_KEY];
