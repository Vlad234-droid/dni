import { Request, Response } from 'express';
import { getReportBy, getPDFBuffer, PrintParams } from '../services';
import { executeSafe } from '../utils';
import { Readable } from 'stream';

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

interface ReportFilter {
  entityType: string;
  entityIds: string[];
  groupBy: string;
  from: string;
  to: string;
}

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

export { getReportByFilters, printPDF };
