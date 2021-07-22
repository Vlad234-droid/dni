import { Response, Request, NextFunction } from 'express';
import { getColleagueData, getColleagueUuid, getOpenIdUserInfo, Optional, Plugin } from '@dni-connectors/onelogin';
import { ColleagueType, createOrUpdateDniUser } from '../../services';
import NodeCache from 'node-cache';

type Config<O> = {
  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;

  /**
   * optional, if true, token will be cashed on server and shared between sessions
   * defaults to true
   */
  cache?: boolean;

  /**
   * optional, cache Time-To-Live, in seconds
   * defaults to 6hrs (6 * 60 * 60)
   */
  cacheTtl?: number;
};

/**
 * Plugin cache instance
 */
const dniUserRefreshCache = new NodeCache();

/**
 * A plugin middleware to be used in onelogin.
 * It gets the data from the colleauge API relies on identity data in response the object.
 */
export const dniUserRefreshPlugin = <O>(config: Config<O> & Optional): Plugin => {
  const plugin: Plugin = async (req: Request, res: Response, next: NextFunction) => {
    const { shouldRun = () => true, cache = true, cacheTtl = 1 * 60 * 60 } = config;

    if (!shouldRun(req, res)) {
      return next();
    }

    const colleagueUUID = getColleagueUuid(res);
    if (!colleagueUUID) throw Error('No colleague UUID found');

    if (cache) {
      const dniUserRefresh = dniUserRefreshCache.get(colleagueUUID);
      if (typeof dniUserRefresh === 'string' && dniUserRefresh === 'REFRESHED') {
        return next();
      }
    }

    let colleague: ColleagueType | undefined = getColleagueData(res);
    if (!colleague) {
      // if for some reason colleague data not found,
      // we are constructing user from data we should have

      const openIdUserInfo = getOpenIdUserInfo(res);
      const employeeNumber = openIdUserInfo?.params?.employeeNumber || openIdUserInfo?.params?.EmployeeNumber;
      if (!employeeNumber) throw Error('No Employee Number (TPX) found');

      colleague = {
        colleagueUUID,
        externalSystems: { iam: { id: employeeNumber } },
      };
    }

    await createOrUpdateDniUser(colleague!);

    if (cache) {
      dniUserRefreshCache.set(colleagueUUID, 'REFRESHED', cacheTtl);
    }

    return next();
  };

  plugin.info = 'DNI User Refresh plugin';
  plugin.optional = config.optional || false;

  return plugin;
};
