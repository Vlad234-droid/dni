import { Model, DataTypes, Sequelize } from 'sequelize';

type EmployeeNetworkAttributes = {
  employeeNumber: string;
  networkId: number;
};

class EmployeeNetwork
  extends Model<EmployeeNetworkAttributes>
  implements EmployeeNetworkAttributes {
  public employeeNumber!: string;
  public networkId!: number;

  static initialize(sequelize: Sequelize) {
    EmployeeNetwork.init(
      {
        employeeNumber: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        networkId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'employees_networks',
        underscored: true,
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['employee_number', 'network_id'],
          },
        ],
        sequelize,
      },
    );
    EmployeeNetwork.removeAttribute('id');

    return EmployeeNetwork;
  }
}

export { EmployeeNetwork };
