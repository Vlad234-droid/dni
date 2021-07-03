import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CcmsTriggerEventEnum, DniEntityTypeEnum } from './enums';

@Entity('ccms_notification')
@Index('c_notification__pk', ['notificationUUID'], { unique: true })
class CcmsNotification {
  @PrimaryGeneratedColumn('uuid', { name: 'notification_uuid' })
  notificationUUID!: string;

  @Column({ type: 'enum', name: 'notification_trigger_event', enum: CcmsTriggerEventEnum })
  notificationTriggerEvent!: CcmsTriggerEventEnum;

  @Column('integer', { name: 'entity_id' })
  entityId!: number;

  @Column('enum', { name: 'entity_type', enum: DniEntityTypeEnum })
  entityType!: DniEntityTypeEnum;

  @Column('timestamp with time zone', { name: 'entity_created_at' })
  entityCreatedAt!: Date;

  @Column('timestamp with time zone', { name: 'entity_updated_at', nullable: true })
  entityUpdatedAt?: Date;

  @CreateDateColumn({ name: 'received_at', type: 'timestamp with time zone', nullable: false, default: () => 'now()' })
  receivedAt!: Date;
}

export { CcmsNotification };
