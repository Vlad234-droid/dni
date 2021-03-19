import { Response } from 'express';

type Group = {
  admin: 'Dni_Admin';
};

export type ExtendedSessionData = {
  sessionId: string;
  branchNumber?: number;
  countryCode?: string;
  masteredInLegacy?: boolean;
  dniGroups: Group[];
};

export const getExtendedSessionData = (
  res: Response,
): ExtendedSessionData | undefined =>
  (res as AugmentedResponse).__extendedSessionData;

export const setExtendedSessionData = (
  res: Response,
  data: ExtendedSessionData,
) => {
  (res as AugmentedResponse).__extendedSessionData = data;
};

type AugmentedResponse = Response & {
  __extendedSessionData?: ExtendedSessionData;
};
