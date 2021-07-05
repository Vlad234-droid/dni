/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.example' });
import jestExpress from 'jest-express';
import server, { express } from './app';

jest.mock('express', () => {
  return jestExpress;
});

jest.mock('./utils', () => ({
  getPackageDistFolder: () => '',
}));

jest.mock('./middlewares', () => ({
  openIdConfig: () => ({
    openId: Promise.resolve(''),
  }),
}));

describe('Server run', () => {
  // Close the server after each test
  afterEach(() => {
    if (server) { server.close(); }
  });

  it('check static method was not called', () => {
    expect(express.static).toHaveBeenCalledTimes(0);
  });
});
