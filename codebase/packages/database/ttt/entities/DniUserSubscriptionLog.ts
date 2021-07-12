import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DniUser } from './DniUser';

@Index('d_u_subscription_log$created_at__idx', ['createdAt'], {})
@Index('d_u_subscription_log__pk', ['logUuid'], { unique: true })
@Entity('dni_user_subscription_log', { schema: 'dni' })
export class DniUserSubscriptionLog {
  @Column('uuid', {
    primary: true,
    name: 'log_uuid',
    default: () => 'uuid_generate_v4()',
  })
  logUuid: string;

  @Column('integer', { name: 'subscription_entity_id' })
  subscriptionEntityId: number;

  @Column('enum', {
    name: 'subscription_entity_type',
    enum: ['network', 'event', 'post', 'partner', 'meta-category'],
  })
  subscriptionEntityType: 'network' | 'event' | 'post' | 'partner' | 'meta-category';

  @Column('enum', { name: 'user_action', enum: ['join', 'leave'] })
  userAction: 'join' | 'leave';

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @ManyToOne(() => DniUser, (dniUser) => dniUser.dniUserSubscriptionLogs)
  @JoinColumn([{ name: 'colleague_uuid', referencedColumnName: 'colleagueUuid' }])
  colleagueUu: DniUser;
}
