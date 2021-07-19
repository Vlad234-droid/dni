import { Response } from "express";
import { ColleagueResponse } from "../api";

export const getColleagueData = <T = ColleagueResponse>(
  res: Response,
): T | undefined => res.colleagueData as T | undefined;

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
