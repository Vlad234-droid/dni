import pino from 'pino';
import { createLogger } from '@dni-common/logger';

import { LoggerEvent } from './';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const responseSerializer = (res: any) => {
   return {
      statusCode: res.statusCode,
      location: res.statusCode === 302 ? res.headers?.location : undefined,
      contentType: res.statusCode === 200 || res.statusCode === 201 ? res.headers?.contentType : undefined,
      contentLength: res.statusCode === 200 || res.statusCode === 201 ? res.headers?.contentLength : undefined,
      //headers: res.headers,
   };
}
 
export const pinoLogger = (options?: pino.Bindings) => {
  
   const logger = createLogger({ 
      ...options, 
      serializers: {
         req: requestSerializer,
         res: responseSerializer,
         err: pino.stdSerializers.err,
      },
   });
   
   return (event: LoggerEvent) => {
      const { severity, payload, flow, context, error } = event;
      switch (severity) {
         case 'error': {
            logger.error({ flow, req: context.req, res: context.res, error: payload?.error || error || undefined }, `Onelogin plugin error`);
            break;
         }
         case 'warning': {
            logger.warn({ flow, req: context.req, res: context.res, error: payload?.error || error || undefined }, payload?.message ? `${payload?.message}` : `Onelogin plugin warning`);
            break;
         }
         case 'info': {
            logger.info({ flow, req: context.req, res: context.res }, `${payload?.message}`);
            break;
         }
         case 'debug': {
            logger.debug({ flow, req: context.req, res: context.res }, `${payload?.message}`);
            break;
         }
         case 'trace': {
            logger.trace({ flow, req: context.req, res: context.res }, `${payload?.message}`);
            break;
         }
      }
   }
}
  
// export const defaultPinoLogger = pinoLogger({ name: 'middleware.onelogin' });
  