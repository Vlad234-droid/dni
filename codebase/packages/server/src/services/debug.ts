import { getManager } from '@dni/database';

export const executeQuery = async (queryString: string) => {
  return await getManager().query(queryString);
};
