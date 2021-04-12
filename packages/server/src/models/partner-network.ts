import { Model, DataTypes, Sequelize } from 'sequelize';

type PartnerNetworkAttributes = {
  partnerId: number;
  networkId: number;
};

class PartnerNetwork
  extends Model<PartnerNetworkAttributes>
  implements PartnerNetworkAttributes {
  public partnerId!: number;
  public networkId!: number;

  static initialize(sequelize: Sequelize) {
    PartnerNetwork.init(
      {
        partnerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        networkId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'partner_networks',
        underscored: true,
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['partner_id', 'network_id'],
          },
        ],
        sequelize,
      },
    );
    PartnerNetwork.removeAttribute('id');

    return PartnerNetwork;
  }
}

export { PartnerNetwork };
