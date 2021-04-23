import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Timestampable } from './Timestampable';

enum NotificationActionType {
  // Feed
  POST_UPDATED = 'POST_UPDATED',
  POST_CREATED = 'POST_CREATED',
  POST_ARCHIVED = 'POST_ARCHIVED',
  POST_REMOVED = 'POST_REMOVED',
  // Event
  EVENT_UPDATED = 'EVENT_UPDATED',
  EVENT_CREATED = 'EVENT_CREATED',
  EVENT_ARCHIVED = 'EVENT_ARCHIVED',
  EVENT_REMOVED = 'EVENT_REMOVED',
  // Network
  NETWORK_UPDATED = 'NETWORK_UPDATED',
  NETWORK_CREATED = 'NETWORK_CREATED',
  NETWORK_ARCHIVED = 'NETWORK_ARCHIVED',
  NETWORK_REMOVED = 'NETWORK_REMOVED',
}

enum NotificationEntityType {
  POST = 'POST',
  NETWORK = 'NETWORK',
  EVENT = 'EVENT',
}

@Entity()
class Notification extends Timestampable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: NotificationActionType,
  })
  action: NotificationActionType;

  @Column({
    type: 'enum',
    enum: NotificationEntityType,
  })
  entityType: NotificationEntityType;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  entity: object;
}

export { Notification, NotificationActionType, NotificationEntityType };
