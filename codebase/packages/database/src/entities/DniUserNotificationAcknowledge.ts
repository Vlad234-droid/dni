import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { DniEntityTypeEnum } from './enums';

@Entity('dni_user_notification_acknowledge')
@Index(
  'd_u_n_acknowledge$colleague_uuid$a_entity_id$a_entity_type__uq',
  ['colleagueUUID', 'acknowledgeEntityId', 'acknowledgeEntityType'],
  { unique: true },
)
@Index('d_u_n_acknowledge__pk', ['acknowledgeUUID'], { unique: true })
export class DniUserNotificationAcknowledge {
  @PrimaryGeneratedColumn('uuid', { name: 'acknowledge_uuid' })
  acknowledgeUUID!: string;

  @Column('uuid', { name: 'colleague_uuid' })
  colleagueUUID!: string;

  @Column('enum', { name: 'acknowledge_entity_type', enum: DniEntityTypeEnum })
  acknowledgeEntityType!: DniEntityTypeEnum;

  @Column('integer', { name: 'acknowledge_entity_id' })
  acknowledgeEntityId!: number;

  @CreateDateColumn({ name: 'acknowledge_created_at', type: 'timestamp with time zone', default: () => 'now()' })
  @Index('d_u_n_acknowledge$acknowledge_created_at__idx')
  acknowledgeCreatedAt!: Date;
}
