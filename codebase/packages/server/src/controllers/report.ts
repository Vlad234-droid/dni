import { Request, Response } from 'express';
import { getMembersReportBy, getRegionsReportBy, getDepartmentsReportBy, getPDFBuffer, PrintParams } from '../services';
import { executeSafe } from '../utils';
import { Readable } from 'stream';

interface ReportFilter {
  entityType: string;
  entityIds: string;
  groupBy: string;
  from: string;
  to: string;
}

const getMembersReportByFilters = (req: Request<{}, {}, {}, ReportFilter>, res: Response) => {
  const { entityType, entityIds, groupBy, from, to } = req.query;

  const entityIdsArray = entityIds && entityIds.length > 0 ? entityIds.split(',') : [];

  return executeSafe(res, async () =>
    res.status(200).json(await getMembersReportBy(entityType, entityIdsArray, groupBy, from, to)),
  );
};

const getRegionsReportByFilters = (req: Request<{}, {}, {}, ReportFilter>, res: Response) => {
  const { entityType, entityIds, from, to } = req.query;

  const entityIdsArray = entityIds && entityIds.length > 0 ? entityIds.split(',') : [];

  return executeSafe(res, async () =>
    res.status(200).json(await getRegionsReportBy(entityType, entityIdsArray, from, to)),
  );
};

const getDepartmentsReportByFilters = (req: Request<{}, {}, {}, ReportFilter>, res: Response) => {
  const { entityType, entityIds, from, to } = req.query;

  const entityIdsArray = entityIds && entityIds.length > 0 ? entityIds.split(',') : [];

  return executeSafe(res, async () =>
    res.status(200).json(await getDepartmentsReportBy(entityType, entityIdsArray, from, to)),
  );
};

const printPDF = async (req: Request<{}, {}, PrintParams>, res: Response) => {
  const buffer = await getPDFBuffer(req.body);
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Length': buffer.length,
  });

  stream.pipe(res);
};

export { getMembersReportByFilters, getRegionsReportByFilters, getDepartmentsReportByFilters, printPDF };
