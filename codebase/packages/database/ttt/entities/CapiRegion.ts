import { Column, Entity, Index } from 'typeorm';

@Index('c_region__pk', ['postIndexPrefix'], { unique: true })
@Entity('capi_region', { schema: 'dni' })
export class CapiRegion {
  @Column('character varying', {
    primary: true,
    name: 'post_index_prefix',
    length: 8,
  })
  postIndexPrefix: string;

  @Column('character varying', { name: 'region_name', length: 64 })
  regionName: string;
}
