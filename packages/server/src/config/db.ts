import { createConnection } from '@dni/database';

(async () => {
  try {
    await createConnection();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export {};
