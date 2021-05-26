import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class Timestampable {
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
