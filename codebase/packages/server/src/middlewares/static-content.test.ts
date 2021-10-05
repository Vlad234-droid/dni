/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.example' });
import jestExpress from 'jest-express';
import { Request, Response, NextFunction } from 'express';

// import { clientStaticFile } from 'middlewares';

jest.mock('express', () => {
  return jestExpress;
});

jest.mock('../utils', () => ({
  getPackageDistFolder: () => '',
}));

// describe('Middleware: static-content', () => {
//   it('public static folder have been sent', () => {
//     const request = <Request>{};
//     const response = <Response>{
//       sendFile: <NextFunction>jest.fn(),
//     };
//     const next = <NextFunction>jest.fn();

//     clientStaticFile(request, response, next);

//     expect(response.sendFile).toHaveBeenCalled();
//   });
// });
