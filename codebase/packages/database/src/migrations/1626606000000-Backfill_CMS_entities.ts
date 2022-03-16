import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import {
  cmsPostsApiConnector,
  cmsEventsApiConnector,
  cmsNetworksApiConnector,
  ColleagueCmsApiContext,
} from '@dni-connectors/colleague-cms-api';

import { CommonCcmsEntity } from '../ccms';
import { colleagueCmsContext } from '../ccms/context';
import { getCmsEntity, getCmsEntityCount, GetCountFn, GetEntityFn } from '../ccms/utils';

import { DniEntityTypeEnum } from '../entities';
import { slugify } from '../utils';


export class Migration_Backfill_CMS_entities implements MigrationInterface {
  name = 'Backfill_CMS_entities-1626606000000';

  public async up(queryRunner: QueryRunner): Promise<void> {

    const schema = (queryRunner.connection.options as PostgresConnectionOptions).schema;
    if (schema) {
      await queryRunner.query(`SET search_path TO "$user", ${schema}, public;`);
    }

    // -- c_entity$parent_entity__fk
    await queryRunner.query(`
      ALTER TABLE ccms_entity DROP CONSTRAINT IF EXISTS "c_entity$parent_entity__fk";
    `);

    // init context
    const ctx: ColleagueCmsApiContext = await colleagueCmsContext();

    // Sync order is important

    // NETWORKS
    // console.log(`Processing networks ...`);
    const networksConnector = cmsNetworksApiConnector(ctx);
    await this.processEntity(
      queryRunner,
      DniEntityTypeEnum.NETWORK,
      (query) => networksConnector.getNetworksCount(query),
      (query) => networksConnector.getNetworks(query),
    );

    // EVENTS
    // console.log(`Processing events ...`);
    const eventsConnector = cmsEventsApiConnector(ctx);
    await this.processEntity(
      queryRunner,
      DniEntityTypeEnum.EVENT,
      (query) => eventsConnector.getEventsCount(query),
      (query) => eventsConnector.getEvents(query),
    );

    // POST
    // console.log(`Processing posts ...`);
    const postsConnector = cmsPostsApiConnector(ctx);
    await this.processEntity(
      queryRunner,
      DniEntityTypeEnum.POST,
      (query) => postsConnector.getPostsCount(query),
      (query) => postsConnector.getPosts(query),
    );
  }

  public async down(): Promise<void> {
    console.log(`Nothing to do as part of [${this.name}] migration down operation.`);
  }

  private async processEntity(
    queryRunner: QueryRunner,
    entityType: DniEntityTypeEnum,
    getCountFn: GetCountFn,
    getEntityFn: GetEntityFn<CommonCcmsEntity<string>>,
  ) {
    const totalCount = await getCmsEntityCount(getCountFn);
  
    if (totalCount > 0) {
      for (let i = 0; i < totalCount; i++) {
        const entities = await getCmsEntity(i, 1, getEntityFn);
        if (Array.isArray(entities) && entities.length === 1) {
          const entity = entities[0];
          const ccmsEntity = this.prepareEntity(entity, entityType);

          await queryRunner.query(`
            INSERT INTO ccms_entity(
                entity_id, entity_type
              , slug
              , entity_instance
              , entity_created_at, entity_updated_at, entity_published_at
              , parent_entity_id, parent_entity_type
              , created_at
              ) 
            VALUES(
                $1, $2::dni_entity_type_enum
              , $3
              , $4
              , $5, $6, $7
              , $8, $9::dni_entity_type_enum
              , CURRENT_TIMESTAMP
              )
            ON CONFLICT (entity_id, entity_type) DO UPDATE SET
                slug = $3
              , entity_instance = $4
              , entity_created_at = $5, entity_updated_at = $6, entity_published_at = $7
              , parent_entity_id = $8, parent_entity_type = $9::dni_entity_type_enum
              , updated_at = CURRENT_TIMESTAMP
            WHERE ccms_entity.entity_id = $1
              AND ccms_entity.entity_type = $2::dni_entity_type_enum
            ;`,
            [
              ccmsEntity.entityId,
              ccmsEntity.entityType,
              ccmsEntity.slug,
              ccmsEntity.entityInstance,
              ccmsEntity.entityCreatedAt || new Date,
              ccmsEntity.entityUpdatedAt,
              ccmsEntity.entityPublishedAt,
              ccmsEntity.parentEntityId,
              ccmsEntity.parentEntityType,
            ],
          );
        }
      }
    } else {
      console.log(`No ${entityType}s found.`);
    }
  }

  private prepareEntity<TDate>(
    entity: CommonCcmsEntity<TDate>,
    entityType: DniEntityTypeEnum,
  ): SimpleCcmsEntity<TDate> {
    return {
      entityId: entity.id,
      entityType,
      slug: entity.slug || slugify(entity.title),
      entityInstance: entity,
      entityCreatedAt: entity.created_at || entity.published_at,
      entityUpdatedAt: entity.updated_at || entity.published_at,
      entityPublishedAt: entity.published_at,
      ...this.extractParent(entity),
    };
  }

  private extractParent<TDate>(
    entity: CommonCcmsEntity<TDate>,
  ): Pick<SimpleCcmsEntity<TDate>, 'parentEntityId' | 'parentEntityType'> {
    const parentEvent = Array.isArray(entity.event) 
      ? entity.event[0] 
      : typeof entity.event === 'object'
      ? entity.event as CommonCcmsEntity<TDate>
      : undefined;

    const parentNetworks = Array.isArray(entity.network)
      ? entity.network as Array<CommonCcmsEntity<TDate>>
      : typeof entity.network === 'object'
      ? [ entity.network as CommonCcmsEntity<TDate> ]
      : undefined;

    if (parentEvent || (parentNetworks && parentNetworks.length > 0)) {
      const parentEntityId = parentEvent?.id
        ? parentEvent.id
        : parentNetworks && parentNetworks.length > 0
        ? parentNetworks[0].id
        : undefined;
  
      const parentEntityType = parentEvent?.id
        ? DniEntityTypeEnum.EVENT
        : parentNetworks && parentNetworks.length > 0
        ? DniEntityTypeEnum.NETWORK
        : undefined;
  
      return {
        parentEntityId,
        parentEntityType,
      };
    } else {
      return { };
    }
  }
}

class SimpleCcmsEntity<TDate> {
  entityId: number;
  entityType: DniEntityTypeEnum;
  slug?: string;
  entityInstance?: JSON | object;
  entityCreatedAt?: TDate;
  entityUpdatedAt?: TDate;
  entityPublishedAt?: TDate;
  parentEntityId?: number;
  parentEntityType?: DniEntityTypeEnum;
}