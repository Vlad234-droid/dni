import { CcmsEntity, CcmsNotification, DniEntityTypeEnum } from '../../entities/v2';
import { EntitySubscriberInterface, EventSubscriber, getRepository, InsertEvent } from 'typeorm';

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
    await this.upsertCcrmEntity(event.entity);
  }

  async upsertCcrmEntity(ccrmNotification: CcmsNotification) {
    const ccrmEntity = new CcmsEntity();

    ccrmEntity.entityId = ccrmNotification.entityId;
    ccrmEntity.entityType = ccrmNotification.entityType;

    const ccrmEntityInstance = ccrmNotification.entityInstance! as CommonCcrmEntity;

    if (ccrmEntityInstance) {
      ccrmEntity.slug = ccrmEntityInstance.slug || slugify(ccrmEntityInstance.title);
      ccrmEntity.entityCreatedAt = ccrmEntityInstance.published_at;
      ccrmEntity.entityUpdatedAt = ccrmEntityInstance.published_at;
      ccrmEntity.entityPublishedAt = ccrmEntityInstance.published_at;

      // TODO: create parent entity and notification
      // ccrmEntity.parentEntityId = ccrmEntityInstance.event?.id || ccrmEntityInstance.network?.id;
      // ccrmEntity.parentEntityType = ccrmEntityInstance.event?.id
      //   ? DniEntityTypeEnum.EVENT
      //   : ccrmEntityInstance.network?.id
      //   ? DniEntityTypeEnum.NETWORK
      //   : undefined;
    }

    ccrmEntity.notificationUUID = ccrmNotification.notificationUUID;
    ccrmEntity.notificationTriggerEvent = ccrmNotification.notificationTriggerEvent;

    getRepository(CcmsEntity).save(ccrmEntity);
  }
}
