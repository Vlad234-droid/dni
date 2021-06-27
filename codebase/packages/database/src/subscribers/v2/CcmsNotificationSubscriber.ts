import { CcmsEntity, CcmsNotification, DniEntityTypeEnum } from '../../entities/v2';
import { EntitySubscriberInterface, EventSubscriber, getConnection, InsertEvent } from 'typeorm';

interface CommonCcrmEntity {
  slug: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  network_id?: number;
  event_id?: number;
}

@EventSubscriber()
export class CcmsNotificationSubscriber implements EntitySubscriberInterface<CcmsNotification> {
  /**
   * Indicates that this subscriber only listen to DniUserSubscription events.
   */
  listenTo() {
    return CcmsNotification;
  }

  async afterInsert(event: InsertEvent<CcmsNotification>) {
    await this.upsertCcrmEntity(event.entity);
  }

  async upsertCcrmEntity(ccrmNotification: CcmsNotification) {
    const ccrmEntity = new CcmsEntity();

    ccrmEntity.entityId = ccrmNotification.entityId;
    ccrmEntity.entityType = ccrmNotification.entityType;

    const ccrmEntityInstance = ccrmNotification.entityInstance! as CommonCcrmEntity;

    if (ccrmEntityInstance) {
      ccrmEntity.slug = ccrmEntityInstance.slug;
      ccrmEntity.entityCreatedAt = ccrmEntityInstance.created_at;
      ccrmEntity.entityUpdatedAt = ccrmEntityInstance.updated_at;
      ccrmEntity.entityPublishedAt = ccrmEntityInstance.published_at;

      ccrmEntity.parentEntityId = ccrmEntityInstance.event_id || ccrmEntityInstance.network_id;
      ccrmEntity.parentEntityType = ccrmEntityInstance.event_id
        ? DniEntityTypeEnum.EVENT
        : ccrmEntityInstance.network_id
        ? DniEntityTypeEnum.NETWORK
        : undefined;
    }

    ccrmEntity.notificationUuid = ccrmNotification.notificationUuid;
    ccrmEntity.notificationTriggerEvent = ccrmNotification.notificationTriggerEvent;

    getConnection()
      .createQueryBuilder(CcmsEntity, 'entity')
      .insert()
      .into(CcmsEntity)
      .values(ccrmEntity)
      .onConflict(
        `ON CONSTRAINT "c_entity__pk" ` +
          `DO UPDATE ` +
          `SET slug = :slug ` +
          `  , entity_created_at = :entityCreatedAt ` +
          `  , entity_updated_at = :entityUpdatedAt ` +
          `  , entity_published_at = :entityPublishedAt ` +
          `  , parent_entity_id = :parentEntityId ` +
          `  , parent_entity_type = :parentEntityType ` +
          `  , notification_uuid = :notificationUuid ` +
          `  , notification_trigger_event = :notificationTriggerEvent ` +
          `  , updated_at = now() `,
      )
      .setParameter('slug', ccrmEntity.slug)
      .setParameter('entityCreatedAt', ccrmEntity.entityCreatedAt)
      .setParameter('entityUpdatedAt', ccrmEntity.entityUpdatedAt)
      .setParameter('entityPublishedAt', ccrmEntity.entityPublishedAt)
      .setParameter('parentEntityId', ccrmEntity.parentEntityId)
      .setParameter('parentEntityType', ccrmEntity.parentEntityType)
      .setParameter('notificationUuid', ccrmEntity.notificationUuid)
      .setParameter('notificationTriggerEvent', ccrmEntity.notificationTriggerEvent)
      .execute();
  }
}
