import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('dni_migrations_pk', ['id'], { unique: true })
@Entity('dni_migrations', { schema: 'dni' })
export class DniMigrations {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('bigint', { name: 'timestamp' })
  timestamp: string;

  @Column('character varying', { name: 'name' })
  name: string;
}
