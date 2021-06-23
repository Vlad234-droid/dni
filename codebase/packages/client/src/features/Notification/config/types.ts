import { Dictionary } from '@reduxjs/toolkit';

import { Post } from 'features/Post';
// import { Event } from 'features/Events';
// import { Network } from 'features/Networks';

type Id = number | string;

enum ActionType {
  POST_CREATED = 'POST_CREATED',
  POST_UPDATED = 'POST_UPDATED',
  POST_ARCHIVED = 'POST_ARCHIVED',
  POST_REMOVED = 'POST_REMOVED',
  EVENT_CREATED = 'EVENT_CREATED',
  EVENT_UPDATED = 'EVENT_UPDATED',
  EVENT_ARCHIVED = 'EVENT_ARCHIVED',
  EVENT_REMOVED = 'EVENT_REMOVED',
  NETWORK_CREATED = 'NETWORK_CREATED',
  NETWORK_UPDATED = 'NETWORK_UPDATED',
  NETWORK_ARCHIVED = 'NETWORK_ARCHIVED',
  NETWORK_REMOVED = 'NETWORK_REMOVED',
}

enum PostAs {
  USER = 'poster.user',
  EVENT = 'poster.event',
  NETWORK = 'poster.network',
}

enum EntityType {
  POST = 'Post',
  EVENT = 'Event',
  NETWORK = 'Network',
}

type Notification = {
  id: Id;
  createdAt: string;
  action: ActionType;
  entityType: EntityType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: Post | any;
};

type NotificationView = {
  id: Id;
  createdAt: string;
  actionType: ActionType;
  entityType: EntityType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: Post | any;
  href: string;
  name: string;
  avatar: string;
};

type GroupByEntityId = {
  id: Id;
  notifications: {
    ids: Id[];
    entities: Dictionary<NotificationView>;
  };
  href: string;
  name: string;
  avatar: string;
};

type GroupById = {
  id: Id;
  href: string;
  name: string;
  avatar: string;
};

type GroupByIdInMap = {
  notifications: Map<Id, NotificationView>;
} & GroupById;

type GroupByIdInArray = {
  notifications: NotificationView[];
} & GroupById;

type MultilevelMap = Map<Id, GroupByIdInMap>;

type Groups = Partial<{
  all: Map<Id, NotificationView>;
  [EntityType.POST]: MultilevelMap;
  [EntityType.EVENT]: MultilevelMap;
  [EntityType.NETWORK]: MultilevelMap;
}>;

interface SkinContentProps {
  id: Id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any;
}

export { ActionType, EntityType, PostAs };

export type {
  Id,
  Notification,
  NotificationView,
  GroupByEntityId,
  GroupByIdInArray,
  MultilevelMap,
  Groups,
  SkinContentProps,
};

export interface FormData {
  email: string;
}
