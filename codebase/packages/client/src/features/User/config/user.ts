import { DefaultUser, UserRole } from './types';

const defaultUserState: DefaultUser = {
  roles: [UserRole.GUEST],
};

export { defaultUserState };
