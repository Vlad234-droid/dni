import { colleagueExtractor as extractor } from '../services/employee';

export const colleagueExtractor: Middleware = async (req, res, next) => {
  const colleague = await extractor(req, res);

  req.colleague = colleague;

  next();
};
