import { colleagueApiConnector, ColleagueV2 } from '@dni-connectors/colleague-api';
import { prepareContext } from '../services/context';
import { infoExtractor } from '../services/employee';
import { getInstance as getCacheInstance } from '../services/cache';

export const colleagueExtractor: Middleware = async (req, res, next) => {
  const userInfo = infoExtractor(req, res);

  const tpxId = userInfo?.params?.employeeNumber;
  const cache = getCacheInstance();
  let colleague: ColleagueV2 | null = null;

  if (tpxId) {
    if (cache.has(tpxId)) {
      colleague = cache.get(tpxId)!;
    } else {
      const ctx = await prepareContext(req, res);
      const connector = colleagueApiConnector(ctx);
      const colleagues = await connector.v2.getColleagues({ params: { 'externalSystems.iam.id': tpxId } });
      colleague = colleagues.data.length > 0 ? colleagues.data[0] : null;
      cache.set(tpxId, colleague, process.env.CACHE_COLLEAGUE_TTL || 120);
    }
    res.colleague = colleague;
  }

  next();
};
