import { DniUserActionEnum, DniUserSubscription, DniUserSubscriptionLog } from '../entities';
import { EntitySubscriberInterface, EventSubscriber, getManager, InsertEvent, RemoveEvent } from 'typeorm';

@EventSubscriber()
export class DniUserSubscriptionSubscriber implements EntitySubscriberInterface<DniUserSubscription> {
  /**
   * Indicates that this subscriber only listen to DniUserSubscription events.
   */
  listenTo() {
    return DniUserSubscription;
  }

  async afterInsert(event: InsertEvent<DniUserSubscription>) {
    await this.generateDniUserSubscriptionLog(event.entity, DniUserActionEnum.JOIN);
  }

  async afterRemove(event: RemoveEvent<DniUserSubscription>) {
    // check if entity was removed
    if (event.databaseEntity) {
      await this.generateDniUserSubscriptionLog(event.databaseEntity!, DniUserActionEnum.LEAVE);
    }
  }

  async generateDniUserSubscriptionLog(subscription: DniUserSubscription, userAction: DniUserActionEnum) {
    const manager = getManager();
    const subscriptionLog = new DniUserSubscriptionLog();

    subscriptionLog.colleagueUUID = subscription.colleagueUUID;
    subscriptionLog.subscriptionEntityType = subscription.subscriptionEntityType;
    subscriptionLog.subscriptionEntityId = subscription.subscriptionEntityId;
    subscriptionLog.userAction = userAction;
    if (userAction === DniUserActionEnum.JOIN) {
      subscriptionLog.createdAt = subscription.createdAt;
    }

    await manager.save(subscriptionLog);
  }
}
