import { colleagueUUIDExtractor as extractor } from '../services/employee';

export const colleagueUUIDExtractor: Middleware = async (req, res, next) => {
  const colleagueUUID = await extractor(req, res);

  req.colleagueUUID = colleagueUUID;

  next();
};
