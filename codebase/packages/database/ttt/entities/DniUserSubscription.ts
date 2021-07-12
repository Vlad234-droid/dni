import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DniUser } from './DniUser';

@Index('d_u_subscription__pk', ['colleagueUuid', 'subscriptionEntityId', 'subscriptionEntityType'], { unique: true })
@Index('d_u_subscription$created_at__idx', ['createdAt'], {})
@Entity('dni_user_subscription', { schema: 'dni' })
export class DniUserSubscription {
  @Column('uuid', { primary: true, name: 'colleague_uuid' })
  colleagueUuid: string;

  @Column('integer', { primary: true, name: 'subscription_entity_id' })
  subscriptionEntityId: number;

  @Column('enum', {
    primary: true,
    name: 'subscription_entity_type',
    enum: ['network', 'event', 'post', 'partner', 'meta-category'],
  })
  subscriptionEntityType: 'network' | 'event' | 'post' | 'partner' | 'meta-category';

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @ManyToOne(() => DniUser, (dniUser) => dniUser.dniUserSubscriptions)
  @JoinColumn([{ name: 'colleague_uuid', referencedColumnName: 'colleagueUuid' }])
  colleagueUu: DniUser;
}
