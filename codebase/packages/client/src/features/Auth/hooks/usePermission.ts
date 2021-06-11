import useStore from 'hooks/useStore';
import { User, DefaultUser, UserRole } from 'features/User';

import actionRules from '../config/actionRules';
import { DynamicData } from '../config/types';
import { isAdmin, isManager } from '../../../utils/userRoles';

export function useUserRoles(): UserRole[] | undefined {
  const user = useStore<DefaultUser | User>((s) => s.auth.user);
  return user.roles;
}

export function useIsAdmin(): boolean {
  const userRoles = useUserRoles();
  return isAdmin(userRoles);
}

export function useIsManager(): boolean {
  const userRoles = useUserRoles();
  return isManager(userRoles);
}

export default (action: string, data?: DynamicData) => {
  const user = useStore<DefaultUser | User>((s) => s.auth.user);

  const permissions = actionRules[user.role];

  if (!permissions) {
    // role is not present in the actionRules
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action) && !data) {
    // static rule provided for action
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions && data) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

    return permissionCondition(data);
  }

  return false;
};
