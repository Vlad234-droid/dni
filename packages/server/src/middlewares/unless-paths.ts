import { NextFunction } from 'express';

type Path = string | RegExp;

export const unlessPaths = (
  paths: Path[],
  middleware: Middleware,
): Middleware | NextFunction => (req, res, next) => {
  const isSamePath = paths.some((path) =>
    path instanceof RegExp ? path.test(req.path) : path === req.path,
  );
  return isSamePath ? next() : middleware(req, res, next);
};
