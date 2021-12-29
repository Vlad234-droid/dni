import { Request, Response } from "express";
import { convertErrorToPlainObject } from "@dni-common/object-utils";
import { JSON } from "@energon/type-utils";


export type ExpressContext = {
  req: Request;
  res: Response;
};

export type OneloginFlow =
  | 'login'
  | 'logout'
  | 'post-logout'
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

  export const warn: WarnFn = (flow, message, context, error) => {
    if (error) {
      return {
        severity: 'warning',
        payload: {
          message,
          error: convertErrorToPlainObject(error),
        },
        flow,
        context,
        error,
      };
    } else {
      return {
        severity: 'warning',
        payload: {
          message,
        },
        flow,
        context,
      };
    }
  }

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

export const defaultLogger = consoleLogger;

export { pinoLogger } from './pino-logger';