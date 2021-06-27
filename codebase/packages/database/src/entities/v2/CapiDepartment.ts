import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('capi_department')
@Index('c_department__pk', ['capiBusinessType'], { unique: true })
export class CapiDepartment {
  @PrimaryColumn('character varying', { name: 'capi_business_type', length: 32 })
  capiBusinessType!: string;

  @Column('character varying', { name: 'display_name', length: 64 })
  displayName!: string;
}
