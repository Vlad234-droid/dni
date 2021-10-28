import Loading from 'types/loading';
import { EntityType } from 'types/entity';

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
  personalEmail?: EmailAddress;
  notificationSettings : EmailNotificationSettings;
};

type FormData = {
  email: string;
};

type EmailNotificationSettings = {
  settings: {
    receivePostsEmailNotifications: boolean;
    receiveEventsEmailNotifications: boolean;
  };
};

type EmailAddress = {
  emailAddress: string;
  alias: 'Personal' | string;
  addressIdentifier: string;
};

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
  EmailNotificationSettings,
  EmailAddress,
};
