import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CcmsTriggerEventEnum, DniEntityTypeEnum } from './enums';

@Entity('ccms_notification')
@Index('dni_user__ccms_entity_instance', ['entityInstance'], {})
@Index('c_notification__pk', ['notificationUuid'], { unique: true })
class CcmsNotification {
  @PrimaryGeneratedColumn('uuid', { name: 'notification_uuid' })
  notificationUuid!: string;

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

  @Column('jsonb', { name: 'entity_instance', nullable: true })
  entityInstance?: object;

  @CreateDateColumn({ name: 'received_at', type: 'timestamp with time zone', nullable: false, default: () => 'now()' })
  receivedAt!: Date;
}

export { CcmsNotification };
