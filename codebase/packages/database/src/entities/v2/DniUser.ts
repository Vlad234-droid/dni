import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('dni_user')
@Index('dni_user__capi_properties', ['capiProperties'], {})
@Index('dni_user__pk', ['colleagueUUID'], { unique: true })
export class DniUser {
  @PrimaryColumn('uuid', { name: 'colleague_uuid' })
  colleagueUUID!: string;

  @Column('character varying', { name: 'employee_number', length: 12 })
  employeeNumber!: string;

  @Column('jsonb', { name: 'capi_properties', nullable: true })
  capiProperties?: object;

  @Column('jsonb', { name: 'setting_properties', nullable: true })
  settingProperties?: object;

  @Column({ name: 'last_login_at', type: 'timestamp with time zone', nullable: true })
  lastLoginAt!: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'now()' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', nullable: true })
  updatedAt?: Date;
}
