import { CcmsEntity, CcmsNotification, DniEntityTypeEnum } from '../../entities/v2';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, EntityManager } from 'typeorm';
import { slugify } from '../../utils';

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

@EventSubscriber()
export class CcmsNotificationSubscriber implements EntitySubscriberInterface<CcmsNotification> {
  /**
   * Indicates that this subscriber only listen to DniUserSubscription events.
   */
  listenTo() {
    return CcmsNotification;
  }

  async afterInsert(event: InsertEvent<CcmsNotification>) {
    await this.upsertCcrmEntity(event.entity, event.manager, event.queryRunner.data.entityInstance);
  }

  async upsertCcrmEntity(ccrmNotification: CcmsNotification, manager: EntityManager, entityInstance: CommonCcrmEntity) {
    const ccrmEntity = new CcmsEntity();

    ccrmEntity.entityId = ccrmNotification.entityId;
    ccrmEntity.entityType = ccrmNotification.entityType;

    console.log(` ==> ccrmEntityInstance = ${JSON.stringify(entityInstance, undefined, 3)}`);

    if (entityInstance) {
      ccrmEntity.slug = entityInstance.slug || slugify(entityInstance.title);
      ccrmEntity.entityInstance = entityInstance;
      ccrmEntity.entityCreatedAt = entityInstance.published_at;
      ccrmEntity.entityUpdatedAt = entityInstance.published_at;
      ccrmEntity.entityPublishedAt = entityInstance.published_at;

      const parent = entityInstance.event || entityInstance.network;
      if (parent) {
        const parentEntityType = entityInstance.event?.id
          ? DniEntityTypeEnum.EVENT
          : entityInstance.network?.id
          ? DniEntityTypeEnum.NETWORK
          : undefined;

        const ccrmParentEntity = new CcmsEntity();

        ccrmParentEntity.entityId = parent.id;
        ccrmParentEntity.entityType = parentEntityType!;
        ccrmParentEntity.slug = parent?.slug || slugify(parent!.title);
        ccrmParentEntity.entityInstance = parent;
        ccrmParentEntity.entityCreatedAt = parent?.published_at;
        ccrmParentEntity.entityUpdatedAt = parent?.published_at;
        ccrmParentEntity.entityPublishedAt = parent?.published_at;

        ccrmParentEntity.notificationUUID = ccrmNotification.notificationUUID;
        ccrmParentEntity.notificationTriggerEvent = ccrmNotification.notificationTriggerEvent;

        manager.save(ccrmParentEntity);

        ccrmEntity.parentEntityId = parent.id;
        ccrmEntity.parentEntityType = parentEntityType;
      }
    }

    ccrmEntity.notificationUUID = ccrmNotification.notificationUUID;
    ccrmEntity.notificationTriggerEvent = ccrmNotification.notificationTriggerEvent;

    manager.save(ccrmEntity);
  }
}
