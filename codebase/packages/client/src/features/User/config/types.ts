enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  EMPLOYEE = 'Employee',
  GUEST = 'Guest',
}

interface User {
  id: number;
  name: string;
  preferred_username: string;
  roles: UserRole[];
  networks: number[];
  events: number[];
  params: {
    employeeNumber: string;
  };
}

interface DefaultUser extends Partial<User> {
  roles: [UserRole.GUEST];
}

export type { User, DefaultUser };
export { UserRole };
