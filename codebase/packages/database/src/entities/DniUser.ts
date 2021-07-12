import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DniUserExtras } from './DniUserExtras';

@Entity('dni_user')
@Index('dni_user__pk', ['colleagueUUID'], { unique: true })
export class DniUser {
  @PrimaryColumn('uuid', { name: 'colleague_uuid' })
  colleagueUUID!: string;

  @Column('character varying', { name: 'employee_number', length: 12 })
  employeeNumber!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone', default: () => 'now()' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone', nullable: true })
  updatedAt?: Date;

  @OneToOne(() => DniUserExtras, (extras) => extras.colleagueUUID, {
    cascade: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'colleague_uuid', referencedColumnName: 'colleagueUUID' })
  extras?: DniUserExtras;

  initExtras(): DniUserExtras {
    this.extras = new DniUserExtras();
    this.extras.colleagueUUID = this.colleagueUUID;

    return this.extras;
  }
}
