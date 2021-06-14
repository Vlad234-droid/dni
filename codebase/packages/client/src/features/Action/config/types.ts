enum Action {
  VISIT = 'visit',
  LIST = 'list',
  CREATE = 'create',
  EDIT = 'edit',
  GET = 'get',
  DELETE = 'delete',
  GET_SELF = 'getSelf',
}

enum Component {
  POST_ARCHIVED = 'postArchived',
  NETWORK_PARTICIPANTS = 'networkParticipants',
  CMS_LINK = 'CMSLink',
}

export { Action, Component };
