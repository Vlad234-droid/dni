import { Request, Response, NextFunction } from 'express';
import { unlessPaths } from './unless-paths';

describe('Middleware: unless-paths', () => {
  const middleware = jest.fn();
  const paths = ['/colleague', /^\/colle.+/];

  const req = <Request>{ path: '' };
  const res = <Response>{};
  const next = <NextFunction>jest.fn();

  const checkPaths = unlessPaths(paths, middleware);

  it('calls middleware when req.path is empty', () => {
    checkPaths(req, res, next);

    expect(middleware).toHaveBeenCalled();
  });

  it('calls middleware when req.path not recognized by filter', () => {
    req.path = '/api';
    checkPaths(req, res, next);

    expect(middleware).toHaveBeenCalled();
  });

  it('calls next and ignores middleware when req.path recognized by string comparison', () => {
    req.path = '/colleague';
    checkPaths(req, res, next);

    expect(middleware).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('calls next and ignores middleware when req.path recognized by regex test', () => {
    req.path = '/colleague-api/sthg';
    checkPaths(req, res, next);

    expect(middleware).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
