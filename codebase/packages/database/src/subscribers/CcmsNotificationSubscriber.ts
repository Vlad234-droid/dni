import { CcmsEntity, CcmsNotification, DniEntityTypeEnum, CcmsTriggerEventEnum } from '../entities';
import { CommonCcmsEntity } from '../ccms';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, EntityManager } from 'typeorm';
import { transformEntity } from '../ccms/transformer';

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

  /**
   * 
   * @param ccmsNotification Notification object from CEP
   * @param manager Entity manager
   * @param entityInstance Entity instance acquired from CCMS (Strapi)
   */
  async ccmsNotification(
    ccmsNotification: CcmsNotification, 
    manager: EntityManager, 
    entityInstance: CommonCcmsEntity<Date> | undefined) {

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
      const ccmsEntity = manager.create(CcmsEntity, { 
        entityId: ccmsNotification.entityId,
        entityType: ccmsNotification.entityType,
        ...transformEntity(entityInstance as CommonCcmsEntity<Date>),
        entityCreatedAt: entityInstance?.created_at || entityInstance?.published_at || ccmsNotification.receivedAt || new Date,
        entityUpdatedAt: entityInstance?.updated_at || ccmsNotification.receivedAt || new Date,
        entityPublishedAt: entityInstance?.published_at,
        notificationUUID:  ccmsNotification.notificationUUID,
        notificationTriggerEvent: ccmsNotification.notificationTriggerEvent,
      });
  
      manager.save(ccmsEntity);
    }
  }
}
