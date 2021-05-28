export const cmsAuth: Middleware = (req, res, next) => {

  const token = req.headers.authorization;

  if (process.env.WEB_HOOKS_SECRET !== token) {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  } else {
    next();
  }
};
