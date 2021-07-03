import { CcmsEntity, CcmsNotification, DniEntityTypeEnum } from '../../entities/v2';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, EntityManager } from 'typeorm';

interface CommonCcrmEntity {
  id: number;
  slug: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  network?: CommonCcrmEntity;
  event?: CommonCcrmEntity;
}

// TODO: temp function
const slugify = (value: string) => {
  return String(value)
    .toString()
    .replace(/^\s+|\s+$/g, '') // trim
    .toLowerCase() // to lower case
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, ''); // trim - from end of text
};

@EventSubscriber()
export class CcmsNotificationSubscriber implements EntitySubscriberInterface<CcmsNotification> {
  /**
   * Indicates that this subscriber only listen to DniUserSubscription events.
   */
  listenTo() {
    return CcmsNotification;
  }

  async afterInsert(event: InsertEvent<CcmsNotification>) {
    await this.upsertCcrmEntity(event.entity, event.manager);
  }

  async upsertCcrmEntity(ccrmNotification: CcmsNotification, manager: EntityManager) {
    const ccrmEntity = new CcmsEntity();

    ccrmEntity.entityId = ccrmNotification.entityId;
    ccrmEntity.entityType = ccrmNotification.entityType;

    const ccrmEntityInstance = ccrmNotification.entityInstance! as CommonCcrmEntity;

    if (ccrmEntityInstance) {
      ccrmEntity.slug = ccrmEntityInstance.slug || slugify(ccrmEntityInstance.title);
      ccrmEntity.entityCreatedAt = ccrmEntityInstance.published_at;
      ccrmEntity.entityUpdatedAt = ccrmEntityInstance.published_at;
      ccrmEntity.entityPublishedAt = ccrmEntityInstance.published_at;

      const parent = ccrmEntityInstance.event || ccrmEntityInstance.network;
      if (parent) {
        const ccrmParentEntity = new CcmsEntity();
        const entityType = ccrmEntityInstance.event?.id
          ? DniEntityTypeEnum.EVENT
          : ccrmEntityInstance.network?.id
          ? DniEntityTypeEnum.NETWORK
          : undefined;
        ccrmParentEntity.entityId = parent?.id;
        ccrmParentEntity.entityType = entityType!;
        ccrmParentEntity.slug = parent?.slug || slugify(parent!.title);
        ccrmParentEntity.entityCreatedAt = parent?.published_at;
        ccrmParentEntity.entityUpdatedAt = parent?.published_at;
        ccrmParentEntity.entityPublishedAt = parent?.published_at;

        ccrmParentEntity.notificationUUID = ccrmNotification.notificationUUID;
        ccrmParentEntity.notificationTriggerEvent = ccrmNotification.notificationTriggerEvent;

        manager.save(ccrmParentEntity);

        ccrmEntity.parentEntityId = parent?.id;
        ccrmEntity.parentEntityType = entityType;
      }
    }

    ccrmEntity.notificationUUID = ccrmNotification.notificationUUID;
    ccrmEntity.notificationTriggerEvent = ccrmNotification.notificationTriggerEvent;

    manager.save(ccrmEntity);
  }
}
