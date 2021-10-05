import { Response, Request } from 'express';
import { getUserData, Optional, Plugin } from '@dni-connectors/onelogin';

type Config<O> = {
  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;

  defaultRoles: string[];

  oidcGroupFiltersRegex: RegExp[];

  oidcManagerGroups: string[];

  oidcAdminGroups: string[];
};

/**
 * A plugin middleware to be used in onelogin.
 * It gets the data from the colleauge API relies on identity data in response the object.
 */
export const dniRolesPlugin = <O>(config: Config<O> & Optional): Plugin => {
  const plugin: Plugin = async (req: Request, res: Response) => {
    const { shouldRun = () => true, defaultRoles, oidcGroupFiltersRegex, oidcManagerGroups, oidcAdminGroups } = config;

    if (!shouldRun(req, res)) {
      return;
    }

    const userData = getUserData<{ groups: string[] | string }>(res);
    if (!userData) {
      throw Error('No userData found');
    }

    const userGroups = (Array.isArray(userData.groups) ? userData.groups : (userData.groups || '').split(',') || [])
      .filter(Boolean)
      .filter((group: string) =>
        Array.isArray(oidcGroupFiltersRegex) && oidcGroupFiltersRegex.length > 0
          ? oidcGroupFiltersRegex.some((rr) => rr.test(group))
          : true,
      );

    const userRoles: Set<string> = new Set(defaultRoles);

    if (oidcManagerGroups.some((g) => userGroups.includes(g))) {
      userRoles.add('Manager');
    }
    if (oidcAdminGroups.some((g) => userGroups.includes(g))) {
      userRoles.add('Admin');
    }

    setDniRoles(res, Array.from(userRoles.values()));
  };

  plugin.info = 'DNI User Roles plugin';
  plugin.optional = config.optional || false;

  return plugin;
};

export const getDniRoles = (res: Response): string[] | undefined => res.dniRoles;

export const setDniRoles = (res: Response, dniRoles: string[]) => {
  res.dniRoles = dniRoles;
};

declare global {
  namespace Express {
    export interface Response {
      dniRoles?: string[];
    }
  }
}
