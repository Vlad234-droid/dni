import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class NotificationEmployee {
  @PrimaryColumn()
  colleagueUUID: string;

  @PrimaryColumn()
  notificationId: number;
}
