/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EventSubscriber,
  EntitySubscriberInterface,
  getManager,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import {
  EmployeeEvent,
  EmployeeHistory,
  EmployeeNetwork,
  EmployeeHistoryActionType,
  EmployeeHistoryEntityType,
} from '../entities';

@EventSubscriber()
export class EmployeeSubscriber implements EntitySubscriberInterface {
  async afterInsert(event: InsertEvent<any>) {
    await this.createGenericHistory(
      event.entity,
      EmployeeHistoryActionType.JOIN,
    );
  }

  async beforeRemove(event: RemoveEvent<any>) {
    await this.createGenericHistory(
      event.entity,
      EmployeeHistoryActionType.LEAVE,
    );
  }

  async createGenericHistory(entity: any, action: EmployeeHistoryActionType) {
    if (!this.isEmployeeEvent(entity) && !this.isEmployeeNetwork(entity))
      return;

    const manager = getManager();
    const history = new EmployeeHistory();

    switch (true) {
      case this.isEmployeeEvent(entity):
        history.entityType = EmployeeHistoryEntityType.EVENT;
        history.entityId = (entity as EmployeeEvent).eventId;
        break;
      case this.isEmployeeNetwork(entity):
        history.entityType = EmployeeHistoryEntityType.NETWORK;
        history.entityId = (entity as EmployeeNetwork).networkId;
        break;
    }

    history.entity = entity;
    history.action = action;

    await manager.save(history);
  }

  isEmployeeEvent(
    entity: EmployeeEvent | EmployeeNetwork,
  ): entity is EmployeeEvent {
    return (entity as EmployeeEvent)?.eventId !== undefined;
  }

  isEmployeeNetwork(
    entity: EmployeeEvent | EmployeeNetwork,
  ): entity is EmployeeNetwork {
    return (entity as EmployeeNetwork)?.networkId !== undefined;
  }
}
