import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EmployeeEvent {
  @PrimaryColumn()
  employeeNumber: string;

  @PrimaryColumn()
  eventId: number;
}
