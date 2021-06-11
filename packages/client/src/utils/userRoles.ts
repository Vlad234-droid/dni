import { UserRole } from '../features/User';

export const isAdmin = (userRoles: UserRole[]): boolean => {
  return userRoles.includes(UserRole.ADMIN);
};

export const isManager = (userRoles: UserRole[]): boolean => {
  return userRoles.includes(UserRole.MANAGER);
};
