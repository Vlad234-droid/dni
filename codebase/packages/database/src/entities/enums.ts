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

export { CcmsTriggerEventEnum, DniEntityTypeEnum, DniUserActionEnum };
