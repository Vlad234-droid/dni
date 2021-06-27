import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DniUserActionEnum } from '../../entities/v2/enums';

@Entity('dni_user_subscription_log')
@Index('d_u_subscription_log__pk', ['logUuid'], { unique: true })
export class DniUserSubscriptionLog {
  @PrimaryGeneratedColumn('uuid', { name: 'log_uuid' })
  logUuid!: string;

  @Column('uuid', { name: 'colleague_uuid' })
  colleagueUuid!: string;

  @Column('integer', { name: 'subscription_entity_id' })
  subscriptionEntityId!: number;

  @Column('enum', { name: 'subscription_entity', enum: DniEntityTypeEnum })
  subscriptionEntity!: DniEntityTypeEnum;

  @Column('enum', { name: 'user_action', enum: DniUserActionEnum })
  userAction!: DniUserActionEnum;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'now()' })
  createdAt!: Date;
}
