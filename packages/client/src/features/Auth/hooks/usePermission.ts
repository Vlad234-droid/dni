import useStore from 'hooks/useStore';
import { User, DefaultUser } from 'features/User';

import actionRules from '../config/actionRules';
import { DynamicData } from '../config/types';

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
