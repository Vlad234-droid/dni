import pino, { Level } from 'pino';
import pinoHttp from 'pino-http';

import { getLogger } from './application-logger';


const requestSerializer = (req: any) => {
   const result = {
      id: req.id,
      method: req.method,
      url: req.url,
      originalUrl: req.originalUrl,
      remoteAddress: req.remoteAddress,
      remotePort: req.remotePort,
   };

   if (req.url?.startsWith('/api')) {
      const headers = { ...req.headers };
      if (!!headers.authorization) {
         headers.authorization = '<REDUCTED>';
      }
      if (!!headers.cookie) {
         headers.cookie = '<REDUCTED>';
      }

      return { ...result, headers: headers };
   } else {
      return result;
   }
}

const responseSerializer = (res: any) => {
   return {
      statusCode: res.statusCode,
      location: res.statusCode === 302 ? res.headers?.location : undefined,
      contentType: res.statusCode === 200 || res.statusCode === 201 ? res.headers?.contentType : undefined,
      contentLength: res.statusCode === 200 || res.statusCode === 201 ? res.headers?.contentLength : undefined,
      //headers: res.headers,
   };
}

export const getHttpLoggerMiddleware = (name?: string): pinoHttp.HttpLogger => {
   const rootLogger = getLogger();
   const rootLoggerName = (rootLogger as any).name;

   const httpName = rootLoggerName ? `${rootLoggerName}.${name || 'http'}` : name || 'http';

   return pinoHttp({
      name: httpName,
      logger: rootLogger,
      customLogLevel: (res: any): Level => { return res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'debug' },
      serializers: {
         req: requestSerializer,
         res: responseSerializer,
         responseTime: (value) => `${value} ms`,
         err: pino.stdSerializers.err,
      },
      wrapSerializers: true,
   });
};
