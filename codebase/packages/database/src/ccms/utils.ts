import { ApiInput, BaseApiParams } from '@dni-connectors/colleague-cms-api';
import { CommonCcmsEntity } from './CommonCcmsEntity';

export type GetCountFn = (query: ApiInput<BaseApiParams>) => Promise<{ data: number }>;
export type GetEntityFn<T> = (query: ApiInput<BaseApiParams>) => Promise<{ data: Array<T> }>;

/**
 * 
 * @param getCountFn 
 * @returns 
 */
 export const getCmsEntityCount = async (getCountFn: GetCountFn): Promise<number> => {
  const countQuery: ApiInput<BaseApiParams> = {
    params: {
      _publicationState: 'preview',
    },
  };
  
  const ccmsResponse = await getCountFn(countQuery);
  return ccmsResponse.data;
};
  
/**
 * 
 * @param offset 
 * @param count 
 * @param getEntityFn 
 * @returns 
 */
export const getCmsEntity = async (
  offset: number,
  count: number,
  getEntityFn: GetEntityFn<CommonCcmsEntity<string>>,
): Promise<Array<CommonCcmsEntity<string>>> => {
  const entityQuery: ApiInput<BaseApiParams> = {
    params: {
      _start: `${offset}`,
      _limit: `${count}`,
      _publicationState: 'preview',
      _sort: 'id:ASC',
    },
  };
  
  const ccmsResponse = await getEntityFn(entityQuery);
  return ccmsResponse.data;
};
