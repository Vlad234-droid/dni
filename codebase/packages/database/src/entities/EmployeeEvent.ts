import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EmployeeEvent {
  @PrimaryColumn()
  tpxId: string;

  @PrimaryColumn()
  eventId: number;
}
