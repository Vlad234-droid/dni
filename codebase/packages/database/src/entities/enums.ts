import { snakeCase, shorten } from 'typeorm/util/StringUtils';

import { getSchemaPrefix } from "../utils";

enum CcmsTriggerEventEnum {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  PUBLISHED = 'published',
}

enum DniEntityTypeEnum {
  NETWORK = 'network',
  EVENT = 'event',
  POST = 'post',
}

enum DniUserActionEnum {
  JOIN = 'join',
  LEAVE = 'leave',
}

export const serializeEnum = <E extends string | number>(enumName: string, ee: E[] | E): string => {
  const schemaPrefix = getSchemaPrefix();
  if (Array.isArray(ee)) {
    return `ARRAY[${ee.map(e => serializeEnum(enumName, e)).join(',')}]`;
  } else {

    return `'${ee}'::${schemaPrefix}${enumName}`;
  }
}

export { CcmsTriggerEventEnum, DniEntityTypeEnum, DniUserActionEnum };
