import { Column, Entity, Index, OneToMany } from 'typeorm';
import { CcmsEntity } from './CcmsEntity';

@Index('c_notification$entity_created_at__idx', ['entityCreatedAt'], {})
@Index('c_notification__pk', ['notificationUuid'], { unique: true })
@Index('c_notification$entity_received_at__idx', ['receivedAt'], {})
@Entity('ccms_notification', { schema: 'dni' })
export class CcmsNotification {
  @Column('uuid', {
    primary: true,
    name: 'notification_uuid',
    default: () => 'uuid_generate_v4()',
  })
  notificationUuid: string;

  @Column('enum', {
    name: 'notification_trigger_event',
    enum: ['created', 'updated', 'deleted', 'published'],
  })
  notificationTriggerEvent: 'created' | 'updated' | 'deleted' | 'published';

  @Column('integer', { name: 'entity_id' })
  entityId: number;

  @Column('enum', {
    name: 'entity_type',
    enum: ['network', 'event', 'post', 'partner', 'meta-category'],
  })
  entityType: 'network' | 'event' | 'post' | 'partner' | 'meta-category';

  @Column('timestamp with time zone', { name: 'entity_created_at' })
  entityCreatedAt: Date;

  @Column('timestamp with time zone', {
    name: 'entity_updated_at',
    nullable: true,
  })
  entityUpdatedAt: Date | null;

  @Column('timestamp with time zone', {
    name: 'received_at',
    default: () => 'now()',
  })
  receivedAt: Date;

  @OneToMany(() => CcmsEntity, (ccmsEntity) => ccmsEntity.notificationUu)
  ccmsEntities: CcmsEntity[];
}
