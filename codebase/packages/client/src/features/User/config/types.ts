enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  GUEST = 'guest',
}

interface User {
  id: number;
  name: string;
  preferred_username: string;
  role: UserRole;
  roles?: UserRole[];
  networks: number[];
  events: number[];
  params: {
    employeeNumber: string;
  };
}

interface DefaultUser extends Partial<User> {
  role: UserRole.GUEST;
}

export type { User, DefaultUser };
export { UserRole };
