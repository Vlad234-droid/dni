import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('dni_user_extras')
@Index('dni_user_extras__pk', ['colleagueUUID'], { unique: true })
export class DniUserExtras {
  @PrimaryColumn('uuid', { name: 'colleague_uuid' })
  colleagueUUID!: string;

  @Column({ name: 'last_login_at', type: 'timestamp with time zone', nullable: true })
  lastLoginAt!: Date;

  @Column('jsonb', { name: 'colleague_properties', nullable: true })
  colleagueProperties?: object;

  @Column('jsonb', { name: 'settings', nullable: true })
  settings?: object;

  @Column('jsonb', { name: 'metadata', nullable: true })
  metadata?: object;
}
