import { colleagueUUIDExtractor as extractor } from '../services/employee';

export const colleagueUUIDExtractor = (...excludePath: string[]): Middleware => {

  const colleagueUUIDExtractorMiddleware: Middleware = async (req, res, next) => {

    if (excludePath && excludePath.length && excludePath.some(ep => ep === req.path)) {
      next();
    } else {
      const colleagueUUID = await extractor(req, res);
      req.colleagueUUID = colleagueUUID;
    
      next();
    }
  };

  return colleagueUUIDExtractorMiddleware;
}
