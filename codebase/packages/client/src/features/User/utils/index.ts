import { UserRole } from '../config/types';

export const getUserRole = (roles: UserRole[]) => {
  if (roles.includes(UserRole.ADMIN)) return UserRole.ADMIN;

  if (roles.includes(UserRole.MANAGER)) return UserRole.MANAGER;

  if (roles.includes(UserRole.EMPLOYEE)) return UserRole.EMPLOYEE;

  return UserRole.GUEST;
};
