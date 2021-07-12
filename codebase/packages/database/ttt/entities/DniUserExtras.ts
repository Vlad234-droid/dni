import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { DniUser } from './DniUser';

@Index('dni_user_extras__pk', ['colleagueUuid'], { unique: true })
@Index('dni_user_extras$metadata__idx', ['metadata'], {})
@Index('dni_user_extras$settings__idx', ['settings'], {})
@Entity('dni_user_extras', { schema: 'dni' })
export class DniUserExtras {
  @Column('uuid', { primary: true, name: 'colleague_uuid' })
  colleagueUuid: string;

  @Column('jsonb', { name: 'settings', nullable: true })
  settings: object | null;

  @Column('jsonb', { name: 'metadata', nullable: true })
  metadata: object | null;

  @OneToOne(() => DniUser, (dniUser) => dniUser.dniUserExtras, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'colleague_uuid', referencedColumnName: 'colleagueUuid' }])
  colleagueUu: DniUser;
}
