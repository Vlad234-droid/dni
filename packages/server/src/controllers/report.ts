import { Request, Response } from 'express';
import { getReportBy } from '../services';
import { executeSafe } from '../utils';

interface ReportFilter {
  entityType: string;
  entityIds: string[];
  groupBy: string;
  from: string;
  to: string;
}

const getReportByFilters = (
  req: Request<{}, {}, {}, ReportFilter>,
  res: Response,
) => {
  const { entityType, entityIds, groupBy, from, to } = req.query;
  return executeSafe(res, async () =>
    res
      .status(200)
      .json(await getReportBy(entityType, entityIds, groupBy, from, to)),
  );
};

export { getReportByFilters };
