// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorMiddleware = (_err, _req, res, _next) => {
  res.status(500).send('Something broke!');
};
