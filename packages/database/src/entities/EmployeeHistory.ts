import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { Timestampable } from './Timestampable';

enum EmployeeHistoryActionType {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
}

enum EmployeeHistoryEntityType {
  NETWORK = 'NETWORK',
  EVENT = 'EVENT',
}

@Entity()
@Index(['entityType', 'entityId'])
class EmployeeHistory extends Timestampable {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'enum',
    enum: EmployeeHistoryActionType,
  })
  action: EmployeeHistoryActionType;

  @Column({
    type: 'enum',
    enum: EmployeeHistoryEntityType,
  })
  entityType: EmployeeHistoryEntityType;

  @Column()
  entityId: number;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  entity: object;
}

export {
  EmployeeHistory,
  EmployeeHistoryActionType,
  EmployeeHistoryEntityType,
};
