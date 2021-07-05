import Loading from 'types/loading';

enum EntityType {
  NETWORK = 'network',
  EVENT = 'event',
  POST = 'post',
}

type Entity = {
  id: number;
  title: string;
  image?: {
    url?: string;
  };
};

type NotificationResponse = {
  entity_id: number;
  entity_type: EntityType;
  parent_id: number;
  parent_type: EntityType;
  created_at: string;
};

type NetworkNotificationResponse = {
  entities_ids: number[];
  entity_type: EntityType;
  parent_id: number;
  parent_type: EntityType;
  count: number;
};

type Notification = {
  entityId: number;
  entityType: EntityType;
  parentId: number;
  parentType: EntityType;
  createdAt: string;
  entity?: Entity;
  parent?: Entity;
};

type NetworkNotification = {
  entitiesIds: number[];
  entityType: EntityType;
  parentId: number;
  parentType: EntityType;
  count: number;
  parent?: Entity;
};

type EntityIds = {
  networkIds: number[];
  eventIds: number[];
  postIds: number[];
};

type Acknowledge = {
  acknowledgeEntityType: EntityType;
  acknowledgeEntityId: number;
};

type AcknowledgePayload = {
  entityId: number;
  entityType: EntityType;
};

type MetaData = {
  loading: Loading;
  error?: string;
};

type Error = {
  error: {
    message: string;
  };
};

type State = {
  notifications: {
    list: Notification[];
    metadata: MetaData;
  };
  networkNotifications: {
    list: NetworkNotification[];
    metadata: MetaData;
  };
  isSidebarOpened: boolean;
};

type FormData = {
  email: string;
};

export { EntityType };

export type {
  Entity,
  NetworkNotification,
  Notification,
  AcknowledgePayload,
  Acknowledge,
  Error,
  State,
  NetworkNotificationResponse,
  NotificationResponse,
  FormData,
  EntityIds,
};
