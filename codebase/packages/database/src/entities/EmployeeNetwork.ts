import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EmployeeNetwork {
  @PrimaryColumn()
  tpxId: string;

  @PrimaryColumn()
  networkId: number;
}
