import { createTypeOrmConnection } from '@dni/database';

export const initializeTypeOrm = async () => {
  await createTypeOrmConnection();
};
