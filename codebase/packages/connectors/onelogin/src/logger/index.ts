import { Request, Response } from "express";
import { convertErrorToPlainObject } from "@energon/splunk-logger";
import { JSON } from "@energon/type-utils";

import pino from 'pino';


export type ExpressContext = {
  req: Request;
  res: Response;
};

export type OneloginFlow =
  | 'login'
  | 'logout'
  | 'verification'
  | 'plugin'
  | 'other';

export type LoggerEvent = {
  severity: 'trace' | 'debug' | 'info' | 'warning' | 'error';
  payload: JSON;
  flow: OneloginFlow;
  context: ExpressContext;
  error?: Error; 
};

export namespace LoggerEvent {
  export type TraceFn = (
    flow: OneloginFlow,
    message: string,
    context: ExpressContext,
  ) => LoggerEvent;

  export type DebugFn = (
    flow: OneloginFlow,
    message: string,
    context: ExpressContext,
  ) => LoggerEvent;

  export type InfoFn = (
    flow: OneloginFlow,
    message: string,
    context: ExpressContext,
  ) => LoggerEvent;

  export type WarnFn = (
    flow: OneloginFlow,
    message: string,
    context: ExpressContext,
    erorr?: Error,
  ) => LoggerEvent;

  export type ErrorFn = (
    flow: OneloginFlow,
    error: Error,
    context: ExpressContext,
  ) => LoggerEvent;

  export const trace: TraceFn = (flow, message, context) => ({
    severity: 'trace',
    payload: { message },
    flow,
    context,
  });

  export const debug: DebugFn = (flow, message, context) => ({
    severity: 'debug',
    payload: { message },
    flow,
    context,
  });

  export const info: InfoFn = (flow, message, context) => ({
    severity: 'info',
    payload: { message },
    flow,
    context,
  });

  export const warn: WarnFn = (flow, message, context, error) => ({
    severity: 'warning',
    payload: {
      message,
      error: error ? convertErrorToPlainObject(error) : undefined,
    },
    flow,
    context,
    error,
  });

  export const error: ErrorFn = (flow, error, context) => ({
    severity: 'error',
    payload: {
      error: convertErrorToPlainObject(error),
    },
    flow,
    context,
    error,
  });
}

export type Logger = (event: LoggerEvent) => void;

export const consoleLogger: Logger = (event) => {
  const { severity, payload, flow } = event;
  console.log(severity, flow, payload);
};

export const pinoLogger = (optionsOrStream?: pino.LoggerOptions | pino.DestinationStream) => {
  
  const logger = pino(optionsOrStream);
  return (event: LoggerEvent) => {
    const { severity, payload, flow, error } = event;
    switch (severity) {
      case 'error': {
        logger.error({ flow, error: payload?.error || undefined }, `Onelogin plugin error`);
        break;
      }
      case 'warning': {
        logger.warn({ flow, error: payload?.error || undefined }, payload?.message ? `${payload?.message}` : `Onelogin plugin warning`);
        break;
      }
      case 'info': {
        logger.info({ flow }, `${payload?.message}`);
        break;
      }
      case 'debug': {
        logger.debug({ flow }, `${payload?.message}`);
        break;
      }
      case 'trace': {
        logger.trace({ flow }, `${payload?.message}`);
        break;
      }
    }
  }
}

export const defaultPinoLogger = pinoLogger({ name: 'express.middleware.onelogin'});

export const defaultLogger = consoleLogger;