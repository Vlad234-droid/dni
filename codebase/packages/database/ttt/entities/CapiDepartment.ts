import { Column, Entity, Index } from 'typeorm';

@Index('c_department__pk', ['capiBusinessType'], { unique: true })
@Entity('capi_department', { schema: 'dni' })
export class CapiDepartment {
  @Column('character varying', {
    primary: true,
    name: 'capi_business_type',
    length: 32,
  })
  capiBusinessType: string;

  @Column('character varying', { name: 'department_name', length: 64 })
  departmentName: string;
}
