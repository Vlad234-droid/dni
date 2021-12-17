import { CcmsEntity, CcmsNotification, DniEntityTypeEnum, CcmsTriggerEventEnum } from '../entities';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, EntityManager } from 'typeorm';
import { slugify } from '../utils';

interface CommonCcmsEntity {
  id: number;
  slug: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  network?: CommonCcmsEntity | CommonCcmsEntity[] ;
  event?: CommonCcmsEntity | CommonCcmsEntity[];
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
    await this.ccmsNotification(
      event.entity, 
      event.manager, 
      event.queryRunner.data.entityInstance
      );
  }

  async ccmsNotification(
    ccmsNotification: CcmsNotification, 
    manager: EntityManager, 
    entityInstance: CommonCcmsEntity | undefined) {

    if (CcmsTriggerEventEnum.DELETED == ccmsNotification.notificationTriggerEvent) {
      // Process DELETED event
      const builder = manager
        .getRepository(CcmsEntity)
        .createQueryBuilder()
        .update()
        .set({ 
          notificationUUID: ccmsNotification.notificationUUID, 
          notificationTriggerEvent: ccmsNotification.notificationTriggerEvent,
          updatedAt: new Date(), 
          entityDeletedAt: ccmsNotification.receivedAt,   
          //entityInstance: undefined,
        })
        .where(`entityId = :entityId AND entityType = :entityType`, {
          entityId: ccmsNotification.entityId,
          entityType: ccmsNotification.entityType,
        });

      if (DniEntityTypeEnum.POST != ccmsNotification.entityType) {
        builder.orWhere(`parentEntityId = :parentEntityId AND parentEntityType = :parentEntityType`, {
          parentEntityId: ccmsNotification.entityId,
          parentEntityType: ccmsNotification.entityType,
        });
      }

      builder.execute();
    } else {
      // Process CREATED,UPDATED event
      const ccmsEntity = new CcmsEntity();

      ccmsEntity.entityId = ccmsNotification.entityId;
      ccmsEntity.entityType = ccmsNotification.entityType;

      console.log(` ==> ccmsEntityInstance = ${entityInstance ? JSON.stringify(entityInstance, undefined, 3): 'NULL'}`);

      if (entityInstance) {
        ccmsEntity.slug = entityInstance.slug || slugify(entityInstance.title);
        ccmsEntity.entityInstance = entityInstance;
        ccmsEntity.entityCreatedAt = 
          entityInstance.created_at || entityInstance.published_at || ccmsNotification.receivedAt || new Date;

        ccmsEntity.entityUpdatedAt = entityInstance.updated_at || ccmsNotification.receivedAt || new Date;
        ccmsEntity.entityPublishedAt = entityInstance.published_at;

        ccmsEntity.notificationUUID = ccmsNotification.notificationUUID;
        ccmsEntity.notificationTriggerEvent = ccmsNotification.notificationTriggerEvent;
  
        const parentEvent = (Array.isArray(entityInstance.event) && entityInstance.event.length > 0) ? entityInstance.event[0] : entityInstance.event as CommonCcmsEntity | undefined;
        const parentNetwork = (Array.isArray(entityInstance.network) && entityInstance.network.length > 0) ? entityInstance.network[0] : entityInstance.network as CommonCcmsEntity | undefined;

        if (parentEvent || parentNetwork) {
          const parentEntityType = parentEvent?.id
            ? DniEntityTypeEnum.EVENT
            : parentNetwork?.id
            ? DniEntityTypeEnum.NETWORK
            : undefined;

          ccmsEntity.parentEntityId = (parentEvent || parentNetwork)?.id;
          ccmsEntity.parentEntityType = parentEntityType;
        }
      }

      manager.save(ccmsEntity);
    }
  }
}
