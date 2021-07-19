import { Response } from "express";
import { LocationResponse } from "../api";

export const getLocationData = <T = LocationResponse>(
  res: Response,
): T | undefined => res.locationData as T | undefined;

export const setLocationData = <T>(res: Response, locationData: T) => {
  res.locationData = locationData;
};

declare global {
  namespace Express {
    export interface Response {
      locationData?: unknown;
    }
  }
}
