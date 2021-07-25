import express from 'express';

type Path = string | RegExp;

export const unlessPaths =
  (paths: Path[], middleware: express.Handler): express.Handler =>
  (req, res, next) => {
    const isSamePath = paths.some((path) => (path instanceof RegExp ? path.test(req.path) : path === req.path));

    isSamePath ? next() : middleware(req, res, next);
  };
