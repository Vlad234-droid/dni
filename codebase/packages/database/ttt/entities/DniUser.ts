import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { DniUserExtras } from './DniUserExtras';
import { DniUserNotificationAcknowledge } from './DniUserNotificationAcknowledge';
import { DniUserSubscription } from './DniUserSubscription';
import { DniUserSubscriptionLog } from './DniUserSubscriptionLog';

@Index('dni_user$capi_properties__idx', ['capiProperties'], {})
@Index('dni_user__pk', ['colleagueUuid'], { unique: true })
@Index('dni_user$created_at__idx', ['createdAt'], {})
@Entity('dni_user', { schema: 'dni' })
export class DniUser {
  @Column('uuid', { primary: true, name: 'colleague_uuid' })
  colleagueUuid: string;

  @Column('character varying', { name: 'employee_number', length: 12 })
  employeeNumber: string;

  @Column('jsonb', { name: 'capi_properties', nullable: true })
  capiProperties: object | null;

  @Column('timestamp with time zone', { name: 'last_login_at', nullable: true })
  lastLoginAt: Date | null;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToOne(() => DniUserExtras, (dniUserExtras) => dniUserExtras.colleagueUu)
  dniUserExtras: DniUserExtras;

  @OneToMany(
    () => DniUserNotificationAcknowledge,
    (dniUserNotificationAcknowledge) => dniUserNotificationAcknowledge.colleagueUu,
  )
  dniUserNotificationAcknowledges: DniUserNotificationAcknowledge[];

  @OneToMany(() => DniUserSubscription, (dniUserSubscription) => dniUserSubscription.colleagueUu)
  dniUserSubscriptions: DniUserSubscription[];

  @OneToMany(() => DniUserSubscriptionLog, (dniUserSubscriptionLog) => dniUserSubscriptionLog.colleagueUu)
  dniUserSubscriptionLogs: DniUserSubscriptionLog[];
}
