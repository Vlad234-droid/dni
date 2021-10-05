import { createTypeOrmConnection } from '@dni/database';
import { ConnectionOptions } from 'typeorm';

export const initializeTypeOrm = async (overrideOptions?: Partial<ConnectionOptions>) => {
  await createTypeOrmConnection(overrideOptions);
};
