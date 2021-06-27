import { DniUserActionEnum, DniUserSubscription, DniUserSubscriptionLog } from '../../entities/v2';
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

  async beforeRemove(event: RemoveEvent<DniUserSubscription>) {
    await this.generateDniUserSubscriptionLog(event.entity!, DniUserActionEnum.LEAVE);
  }

  async generateDniUserSubscriptionLog(entity: DniUserSubscription, userAction: DniUserActionEnum) {
    const manager = getManager();
    const subscriptionLog = new DniUserSubscriptionLog();

    subscriptionLog.colleagueUuid = entity.colleagueUuid;
    subscriptionLog.subscriptionEntity = entity.subscriptionEntity;
    subscriptionLog.subscriptionEntityId = entity.subscriptionEntityId;
    subscriptionLog.userAction = userAction;

    await manager.save(subscriptionLog);
  }
}
