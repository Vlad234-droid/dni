import { Handler, Request, Response } from 'express';
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

const getMembersReportByFilters: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const { entityType, entityIds, groupBy, from, to } = req.query as unknown as ReportFilter;
    const entityIdsArray = entityIds && entityIds.length > 0 ? entityIds.split(',') : [];
    const membersReport = await getMembersReportBy(entityType, entityIdsArray, groupBy, from, to);
    res.status(200).json(membersReport);
  });
};

const getRegionsReportByFilters: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const { entityType, entityIds, from, to } = req.query as unknown as ReportFilter;
    const entityIdsArray = entityIds && entityIds.length > 0 ? entityIds.split(',') : [];
    const regionsReport = await getRegionsReportBy(entityType, entityIdsArray, from, to);
    res.status(200).json(regionsReport);
  });
};

const getDepartmentsReportByFilters: Handler = async (req: Request, res: Response) => {
  executeSafe(res, async () => {
    const { entityType, entityIds, from, to } = req.query as unknown as ReportFilter;
    const entityIdsArray = entityIds && entityIds.length > 0 ? entityIds.split(',') : [];
    const departmentsReport = await getDepartmentsReportBy(entityType, entityIdsArray, from, to);
    res.status(200).json(departmentsReport);
  });
};

const printPDF: Handler = async (req: Request<{}, {}, PrintParams>, res: Response) => {
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
