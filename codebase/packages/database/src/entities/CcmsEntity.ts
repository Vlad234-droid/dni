import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { CcmsTriggerEventEnum, DniEntityTypeEnum } from './enums';
import { 
  CcmsEntityKey,
  fromPostgresCompositeTypeArray, 
  toPostgresCompositeTypeArray, 
  fromPostgresCompositeType, 
  toPostgresCompositeType, 
} from './CcmsEntityKey';

@Entity('ccms_entity')
@Index('c_entity__pk', ['entityId', 'entityType'], { unique: true })
class CcmsEntity {
  
  @PrimaryColumn('integer', { name: 'entity_id' })
  entityId!: number;

  @PrimaryColumn('enum', { name: 'entity_type', enum: DniEntityTypeEnum })
  entityType!: DniEntityTypeEnum;

  @Column('character varying', { name: 'slug', length: 128 })
  slug!: string;

  @Column('jsonb', { name: 'entity_instance', nullable: true })
  entityInstance?: object;

  @Column('jsonb', { name: 'entity_metadata', nullable: true })
  entityMetadata?: object;

  @Column('timestamp with time zone', { name: 'entity_created_at', default: () => 'now()' })
  entityCreatedAt!: Date;

  @Column('timestamp with time zone', { name: 'entity_updated_at', nullable: true })
  entityUpdatedAt?: Date;

  @Column('timestamp with time zone', { name: 'entity_published_at', nullable: true })
  entityPublishedAt?: Date;

  @Column('timestamp with time zone', { name: 'entity_deleted_at', nullable: true })
  entityDeletedAt?: Date;

  @Column('text', { name: 'parents', transformer: { from: fromPostgresCompositeTypeArray, to: toPostgresCompositeTypeArray } })
  parents?: CcmsEntityKey[];

  @Column('text', { name: 'parent_event', transformer: { from: fromPostgresCompositeType, to: toPostgresCompositeType } })
  parentEvent?: CcmsEntityKey;

  @Column('text', { name: 'parent_networks', transformer: { from: fromPostgresCompositeTypeArray, to: toPostgresCompositeTypeArray } })
  parentNetworks?: CcmsEntityKey[];

  @Column('integer', { name: 'parent_entity_id', nullable: true })
  parentEntityId?: number;

  @Column('enum', { name: 'parent_entity_type', nullable: true, enum: DniEntityTypeEnum })
  parentEntityType?: DniEntityTypeEnum;

  @Column('uuid', { name: 'notification_uuid', nullable: true })
  notificationUUID?: string;

  @Column('enum', { name: 'notification_trigger_event', enum: CcmsTriggerEventEnum, nullable: true })
  notificationTriggerEvent?: CcmsTriggerEventEnum;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'now()' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', nullable: true })
  updatedAt?: Date;
}

export { CcmsEntity };
