import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CcmsNotification } from './CcmsNotification';

@Index('c_entity$created_at__idx', ['createdAt'], {})
@Index('c_entity$entity_created_at__idx', ['entityCreatedAt'], {})
@Index('c_entity__pk', ['entityId', 'entityType'], { unique: true })
@Index('c_entity$entity_instance__idx', ['entityInstance'], {})
@Index('c_entity$entity_metadata__idx', ['entityMetadata'], {})
@Entity('ccms_entity', { schema: 'dni' })
export class CcmsEntity {
  @Column('integer', { primary: true, name: 'entity_id' })
  entityId: number;

  @Column('enum', {
    primary: true,
    name: 'entity_type',
    enum: ['network', 'event', 'post', 'partner', 'meta-category'],
  })
  entityType: 'network' | 'event' | 'post' | 'partner' | 'meta-category';

  @Column('character varying', { name: 'slug', length: 128 })
  slug: string;

  @Column('jsonb', { name: 'entity_instance', nullable: true })
  entityInstance: object | null;

  @Column('jsonb', { name: 'entity_metadata', nullable: true })
  entityMetadata: object | null;

  @Column('timestamp with time zone', { name: 'entity_created_at' })
  entityCreatedAt: Date;

  @Column('timestamp with time zone', {
    name: 'entity_updated_at',
    nullable: true,
  })
  entityUpdatedAt: Date | null;

  @Column('timestamp with time zone', {
    name: 'entity_published_at',
    nullable: true,
  })
  entityPublishedAt: Date | null;

  @Column('timestamp with time zone', {
    name: 'entity_deleted_at',
    nullable: true,
  })
  entityDeletedAt: Date | null;

  @Column('enum', {
    name: 'notification_trigger_event',
    nullable: true,
    enum: ['created', 'updated', 'deleted', 'published'],
  })
  notificationTriggerEvent: 'created' | 'updated' | 'deleted' | 'published' | null;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => CcmsNotification, (ccmsNotification) => ccmsNotification.ccmsEntities)
  @JoinColumn([{ name: 'notification_uuid', referencedColumnName: 'notificationUuid' }])
  notificationUu: CcmsNotification;

  @ManyToOne(() => CcmsEntity, (ccmsEntity) => ccmsEntity.ccmsEntities)
  @JoinColumn([
    { name: 'parent_entity_id', referencedColumnName: 'entityId' },
    { name: 'parent_entity_type', referencedColumnName: 'entityType' },
  ])
  ccmsEntity: CcmsEntity;

  @OneToMany(() => CcmsEntity, (ccmsEntity) => ccmsEntity.ccmsEntity)
  ccmsEntities: CcmsEntity[];
}
