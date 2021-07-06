import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('capi_region')
@Index('c_region__pk', ['postIndexPrefix'], { unique: true })
export class CapiRegion {
  @PrimaryColumn('character varying', { name: 'post_index_prefix', length: 8 })
  postIndexPrefix!: string;

  @Column('character varying', { name: 'region_name', length: 64 })
  regionName!: string;
}
