import { Model, DataTypes, Sequelize } from 'sequelize';

type EmployeeEventAttributes = {
  employeeNumber: string;
  eventId: number;
};

class EmployeeEvent
  extends Model<EmployeeEventAttributes>
  implements EmployeeEventAttributes {
  public employeeNumber!: string;
  public eventId!: number;

  static initialize(sequelize: Sequelize) {
    EmployeeEvent.init(
      {
        employeeNumber: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        eventId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'employees_events',
        underscored: true,
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['employee_number', 'event_id'],
          },
        ],
        sequelize,
      },
    );
    EmployeeEvent.removeAttribute('id');

    return EmployeeEvent;
  }
}

export { EmployeeEvent };
