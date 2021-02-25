enum Status {
  PENDING = 'pending',
  ACTIVE = 'active',
  LOCKED = 'locked',
}

enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  GUEST = 'guest',
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  status: Status;
  role: UserRole;
}

interface DefaultUser extends Partial<User> {
  role: UserRole.GUEST;
}

export type { User, DefaultUser };
export { Status, UserRole };
