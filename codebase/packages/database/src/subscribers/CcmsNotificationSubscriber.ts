import { CcmsEntity, CcmsNotification, DniEntityTypeEnum, CcmsTriggerEventEnum, CcmsEntityParentKey } from '../entities';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, EntityManager } from 'typeorm';
import { slugify } from '../utils';

export interface CommonCcmsEntity<TDate> {
  id: number;
  slug: string;
  title: string;
  description?: string;
  shortDescription?: string;
  archived?: boolean;
  created_at: TDate;
  updated_at: TDate;
  published_at: TDate;
  network?: CommonCcmsEntity<TDate> | CommonCcmsEntity<TDate>[];
  event?: CommonCcmsEntity<TDate> | CommonCcmsEntity<TDate>[];
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
      const ccmsEntity = new CcmsEntity();

      ccmsEntity.entityId = ccmsNotification.entityId;
      ccmsEntity.entityType = ccmsNotification.entityType;

      // console.log(` ==> ccmsEntityInstance = ${entityInstance ? JSON.stringify(entityInstance, undefined, 3): 'NULL'}`);

      if (entityInstance) {
        ccmsEntity.slug = entityInstance.slug || slugify(entityInstance.title);
        ccmsEntity.entityInstance = entityInstance;
        ccmsEntity.entityCreatedAt = 
          entityInstance.created_at || entityInstance.published_at || ccmsNotification.receivedAt || new Date;

        ccmsEntity.entityUpdatedAt = entityInstance.updated_at || ccmsNotification.receivedAt || new Date;
        ccmsEntity.entityPublishedAt = entityInstance.published_at;

        ccmsEntity.notificationUUID = ccmsNotification.notificationUUID;
        ccmsEntity.notificationTriggerEvent = ccmsNotification.notificationTriggerEvent;
  
        const parents: CcmsEntityParentKey[] = [];
        if (Array.isArray(entityInstance.event) && entityInstance.event.length > 0) {
          const parentEvents = entityInstance.event.map(p => { return { entityId: p.id, entityType: DniEntityTypeEnum.EVENT }});
          parents.push(...parentEvents);
        } else if (!!entityInstance.event && typeof entityInstance.event === 'object' && !Array.isArray(entityInstance.event)) {
          const parentEvent = { entityId: (<CommonCcmsEntity<Date>> entityInstance.event)?.id, entityType: DniEntityTypeEnum.EVENT };
          parents.push(parentEvent);
        }
        if (Array.isArray(entityInstance.network) && entityInstance.network.length > 0) {
          const parentNetworks = entityInstance.network.map(p => { return { entityId: p.id, entityType: DniEntityTypeEnum.NETWORK }});
          parents.push(...parentNetworks);
        } else if (!!entityInstance.network && typeof entityInstance.network === 'object' && !Array.isArray(entityInstance.network)) {
          const parentNetwork = { entityId: (<CommonCcmsEntity<Date>> entityInstance.network)?.id, entityType: DniEntityTypeEnum.NETWORK };
          parents.push(parentNetwork);
        }
        
        const parentEvent = (Array.isArray(entityInstance.event) && entityInstance.event.length > 0) 
          ? entityInstance.event[0] 
          : entityInstance.event as CommonCcmsEntity<Date> | undefined;

        const parentNetwork = (Array.isArray(entityInstance.network) && entityInstance.network.length > 0) 
          ? entityInstance.network[0] 
          : entityInstance.network as CommonCcmsEntity<Date> | undefined;

        if (parentEvent || parentNetwork || parents.length > 0) {
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
