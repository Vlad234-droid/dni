import { Model } from 'sequelize';

type AggregateNotificationAttributes = {
  entityType: string; // Type
  count: number;
  entity: Object;
  relatedIds: number[];
};

class AggregateNotification
  extends Model<AggregateNotificationAttributes>
  implements AggregateNotificationAttributes {
  public entityType!: string;
  public entity!: Object;
  public count!: number;
  public relatedIds!: number[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export { AggregateNotification };
