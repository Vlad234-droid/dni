import { CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';
import { DniEntityTypeEnum } from './enums';

@Entity('dni_user_subscription')
@Index('d_u_subscription__pk', ['colleagueUUID', 'subscriptionEntityType', 'subscriptionEntityId'], { unique: true })
export class DniUserSubscription {
  @PrimaryColumn('uuid', { name: 'colleague_uuid' })
  colleagueUUID!: string;

  @PrimaryColumn('integer', { name: 'subscription_entity_id' })
  subscriptionEntityId!: number;

  @PrimaryColumn('enum', { name: 'subscription_entity_type', enum: DniEntityTypeEnum })
  subscriptionEntityType!: DniEntityTypeEnum;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'now()' })
  createdAt!: Date;
}
