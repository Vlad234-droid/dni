import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { DniUser } from './DniUser';

@Index('d_u_n_acknowledge$acknowledge_created_at__idx', ['acknowledgeCreatedAt'], {})
@Index(
  'd_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__idx',
  ['acknowledgeEntityId', 'acknowledgeEntityType', 'colleagueUuid'],
  {},
)
@Index('d_u_n_acknowledge__pk', ['acknowledgeUuid'], { unique: true })
@Entity('dni_user_notification_acknowledge', { schema: 'dni' })
export class DniUserNotificationAcknowledge {
  @Column('uuid', {
    primary: true,
    name: 'acknowledge_uuid',
    default: () => 'uuid_generate_v4()',
  })
  acknowledgeUuid: string;

  @Column('uuid', { name: 'colleague_uuid' })
  colleagueUuid: string;

  @Column('integer', { name: 'acknowledge_entity_id' })
  acknowledgeEntityId: number;

  @Column('enum', {
    name: 'acknowledge_entity_type',
    enum: ['network', 'event', 'post', 'partner', 'meta-category'],
  })
  acknowledgeEntityType: 'network' | 'event' | 'post' | 'partner' | 'meta-category';

  @Column('timestamp with time zone', {
    name: 'acknowledge_created_at',
    default: () => 'now()',
  })
  acknowledgeCreatedAt: Date;

  @ManyToOne(() => DniUser, (dniUser) => dniUser.dniUserNotificationAcknowledges)
  @JoinColumn([{ name: 'colleague_uuid', referencedColumnName: 'colleagueUuid' }])
  colleagueUu: DniUser;
}
