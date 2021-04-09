import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

type NotificationAttributes = {
  id: number;
  action: string; // ActionType
  entityType: string; // EntityType
  entity: Object;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotificationCreationAttributes
  extends Optional<NotificationAttributes, 'id'> {}

class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes {
  public id!: number;
  public action!: string;
  public entityType!: string;
  public entity!: Object;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Notification.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        action: {
          type: new DataTypes.STRING(40),
          allowNull: false,
        },
        entityType: {
          type: new DataTypes.STRING(40),
          allowNull: false,
        },
        entity: {
          type: DataTypes.JSONB,
        },
      },
      {
        tableName: 'notifications',
        sequelize,
        underscored: true,
      },
    );

    return Notification;
  }
}

export type { NotificationAttributes, NotificationCreationAttributes };

export { Notification };
