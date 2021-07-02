import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { DniEntityTypeEnum, DniUserActionEnum } from './enums';

@Entity('dni_user_subscription_log')
@Index('d_u_subscription_log__pk', ['logUUID'], { unique: true })
export class DniUserSubscriptionLog {
  @PrimaryGeneratedColumn('uuid', { name: 'log_uuid' })
  logUUID!: string;

  @Column('uuid', { name: 'colleague_uuid' })
  colleagueUUID!: string;

  @Column('integer', { name: 'subscription_entity_id' })
  subscriptionEntityId!: number;

  @Column('enum', { name: 'subscription_entity_type', enum: DniEntityTypeEnum })
  subscriptionEntityType!: DniEntityTypeEnum;

  @Column('enum', { name: 'user_action', enum: DniUserActionEnum })
  userAction!: DniUserActionEnum;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'now()' })
  createdAt!: Date;
}
