import { Model, DataTypes, Sequelize } from 'sequelize';

type ColleagueNetworkAttributes = {
  colleagueUuid: number;
  networkId: number;
};

class ColleagueNetwork
  extends Model<ColleagueNetworkAttributes>
  implements ColleagueNetworkAttributes {
  public colleagueUuid!: number;
  public networkId!: number;

  static initialize(sequelize: Sequelize) {
    ColleagueNetwork.init(
      {
        colleagueUuid: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        networkId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'colleague_networks',
        underscored: true,
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['colleague_uuid', 'network_id'],
          },
        ],
        sequelize,
      },
    );
    ColleagueNetwork.removeAttribute('id');

    return ColleagueNetwork;
  }
}

export { ColleagueNetwork };
