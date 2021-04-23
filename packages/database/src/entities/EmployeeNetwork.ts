import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EmployeeNetwork {
  @PrimaryColumn()
  employeeNumber: string;

  @PrimaryColumn()
  networkId: number;
}
