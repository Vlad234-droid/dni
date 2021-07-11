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

type Notification = {
  entityType: EntityType;
  entityId: number;
  entity: Entity;
  rootAncestorType?: EntityType;
  rootAncestorId?: number;
  rootAncestor?: Entity;
  parentEntityType?: EntityType;
  parentEntityId?: number;
  parentEntity?: Entity;
  notifiedAt: string;
};

type NetworkNotification = {
  rootAncestorType?: EntityType;
  rootAncestorId?: number;
  rootAncestor?: Entity;
  entitiesDetails: { entityType: EntityType; entitiesIds: number[] }[];
  recentNotifiedAt: string;
  totalEntitiesCount: number;
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
  FormData,
  EntityIds,
};
