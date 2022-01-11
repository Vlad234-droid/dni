import Loading from 'types/loading';
import { EntityType } from 'types/entity';

type Entity = {
  id: number;
  title: string;
  image?: {
    url?: string;
  };
};

type NotificationListItem = {
  entityType: EntityType;
  entityId: number;
  entityInstance: Entity;
  ancestorType?: EntityType;
  ancestorId?: number;
  ancestorInstance?: Entity;
  notifiedAt: Date;
  acknowledgedAt?: Date;
};

type NotificationGrouppedItem = {
  ancestorType?: EntityType;
  ancestorId?: number;
  ancestorInstance?: Entity;
  nestedEntities: { entityType: EntityType; entityId: number }[];
  nestedEntitiesTotal: number;
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
  plainNotifications: {
    list: NotificationListItem[];
    metadata: MetaData;
  };
  grouppedNotifications: {
    list: NotificationGrouppedItem[];
    metadata: MetaData;
  };
  isSidebarOpened: boolean;
  personalEmail?: EmailAddress;
  notificationSettings: EmailNotificationSettings;
};

type FormData = {
  email: string;
};

type EmailNotificationSettings = {
  receivePostsEmailNotifications: boolean;
  receiveEventsEmailNotifications: boolean;
};

type EmailAddress = {
  emailAddress: string;
  alias: 'Personal' | string;
  addressIdentifier: string;
};

type ConfirmEmailAddress = {
  oldEmailAddress: string;
} & EmailAddress;

export type {
  Entity,
  NotificationListItem,
  NotificationGrouppedItem,
  AcknowledgePayload,
  Acknowledge,
  Error,
  State,
  FormData,
  EntityIds,
  EmailNotificationSettings,
  EmailAddress,
  ConfirmEmailAddress,
};
