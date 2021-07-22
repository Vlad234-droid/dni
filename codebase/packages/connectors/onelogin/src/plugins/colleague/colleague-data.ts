import { Response } from 'express';
import { Colleague } from '@dni-connectors/colleague-api';

export const getColleagueData = <T = Colleague>(res: Response): T | undefined => res.colleagueData as T | undefined;

export const setColleagueData = <T>(res: Response, colleagueData: T) => {
  res.colleagueData = colleagueData;
};

declare global {
  namespace Express {
    export interface Response {
      colleagueData?: unknown;
    }
  }
}
