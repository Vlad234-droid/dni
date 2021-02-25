/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response, NextFunction, Send } from 'express';

import { errorHandler } from './error-handler';

jest.mock('../utils', () => ({
  getPackageDistFolder: () => '',
}));

describe('Middleware: error-handler', () => {
  it('check response', () => {
    const error = <Error>{};
    const request = <Request>{};
    const response = <Response>{
      status: <(code: number) => Response>jest.fn(() => response),
      send: <Send>jest.fn(),
    };
    const next = <NextFunction>jest.fn();

    errorHandler(error, request, response, next);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith('Something broke!');
  });
});
