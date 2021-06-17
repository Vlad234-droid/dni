import { createTypeOrmConnection } from '@dni/database';

export const initializeTypeOrm = async () => {
  await createTypeOrmConnection();
  console.log('Connection to database has been established successfully.');
};
