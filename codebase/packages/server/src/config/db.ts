import { createTypeOrmConnection } from '@dni/database';

(async () => {
  try {
    await createTypeOrmConnection();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export {};
