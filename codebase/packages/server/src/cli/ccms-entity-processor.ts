import cliProgress from 'cli-progress';
import chalk from 'chalk';
import { Repository } from 'typeorm';

import { DniEntityTypeEnum, CcmsEntity, slugify, CommonCcmsEntity, CcmsEntityParentKey } from '@dni/database';
import { ApiInput, BaseApiParams } from '@dni-connectors/colleague-cms-api';

type GetCountFn = (query: ApiInput<BaseApiParams>) => Promise<{ data: number }>;
type GetEntityFn<T> = (query: ApiInput<BaseApiParams>) => Promise<{ data: Array<T> }>;

const getCmsEntityCount = async (getCountFn: GetCountFn): Promise<number> => {
  const countQuery: ApiInput<BaseApiParams> = {
    params: {
      _publicationState: 'preview',
    },
  };

  const ccmsResponse = await getCountFn(countQuery);
  return ccmsResponse.data;
};

const getCmsEntity = async (
  offset: number,
  count: number,
  getEntityFn: GetEntityFn<CommonCcmsEntity<string>>,
): Promise<Array<CommonCcmsEntity<string>>> => {
  const entityQuery: ApiInput<BaseApiParams> = {
    params: {
      _start: `${offset}`,
      _limit: `${count}`,
      _publicationState: 'preview',
      _sort: 'id:ASC',
    },
  };

  const ccmsResponse = await getEntityFn(entityQuery);

  return ccmsResponse.data;
};

const convertToCcmsEntity = (
  repository: Repository<CcmsEntity>,
  entityType: DniEntityTypeEnum,
  entity: CommonCcmsEntity<string>,
): CcmsEntity => {
  const getParent = () => {
    const parents: CcmsEntityParentKey[] = [];
    if (Array.isArray(entity.event) && entity.event.length > 0) {
      const parentEvents = entity.event.map(p => { return { entityId: p.id, entityType: DniEntityTypeEnum.EVENT }});
      parents.push(...parentEvents);
    } else if (!!entity.event && typeof entity.event === 'object' && !Array.isArray(entity.event)) {
      const parentEvent = { entityId: (entity.event as CommonCcmsEntity<string>)?.id, entityType: DniEntityTypeEnum.EVENT };
      parents.push(parentEvent);
    }
    if (Array.isArray(entity.network) && entity.network.length > 0) {
      const parentNetworks = entity.network.map(p => { return { entityId: p.id, entityType: DniEntityTypeEnum.NETWORK }});
      parents.push(...parentNetworks);
    } else if (!!entity.network && typeof entity.network === 'object' && !Array.isArray(entity.network)) {
      const parentNetwork = { entityId: (entity.network as CommonCcmsEntity<string>)?.id, entityType: DniEntityTypeEnum.NETWORK };
      parents.push(parentNetwork);
    }
    
    const parentEvent = (Array.isArray(entity.event) && entity.event.length > 0) 
      ? entity.event[0] 
      : entity.event as CommonCcmsEntity<string> | undefined;

    const parentNetwork = (Array.isArray(entity.network) && entity.network.length > 0) 
      ? entity.network[0] 
      : entity.network as CommonCcmsEntity<string> | undefined;

    if (parentEvent || parentNetwork || parents.length > 0) {
      return {
        parents,
        parentEntityId: (parentEvent || parentNetwork)?.id,
        parentEntityType: parentEvent?.id
          ? DniEntityTypeEnum.EVENT
          : parentNetwork?.id
          ? DniEntityTypeEnum.NETWORK
          : undefined,
      };
    } else {
      return undefined;
    }
  };

  return repository.create({
    entityId: entity.id,
    entityType,
    slug: entity.slug || slugify(entity.title),
    entityInstance: entity,
    entityCreatedAt: entity.created_at || entity.published_at || new Date(),
    entityUpdatedAt: entity.updated_at || entity.published_at,
    entityPublishedAt: entity.published_at,
    ...getParent(),
  });
};

export const processEntity = async (
  repository: Repository<CcmsEntity>,
  entityType: DniEntityTypeEnum,
  getCountFn: GetCountFn,
  getEntityFn: GetEntityFn<CommonCcmsEntity<string>>,
) => {
  const totalCount = await getCmsEntityCount(getCountFn);

  if (totalCount > 0) {
    const progressBar = new cliProgress.SingleBar(
      {
        format:
          `Prosessing ${entityType}s:\t |` + chalk.cyan('{bar}') + '| {percentage}% || {value}/{total} || ETA: {eta}s',
        // barCompleteChar: '\u2588',
        // barIncompleteChar: '\u2591',
        hideCursor: true,
      },
      cliProgress.Presets.rect,
    );

    progressBar.start(totalCount, 0, { speed: 'N/A' });

    for (let i = 0; i < totalCount; i++) {
      const entities = await getCmsEntity(i, 1, getEntityFn);
      const entity = Array.isArray(entities) && entities.length === 1 ? entities[0] : undefined;

      const ccmsEntity = convertToCcmsEntity(repository, entityType, entity as CommonCcmsEntity<string>);
      await repository.save(ccmsEntity);

      //console.log(`Entity ID: ${entity?.id}, created at: ${entity?.created_at}`);
      progressBar.increment();
      progressBar.updateETA();
    }

    progressBar.stop();
  } else {
    console.log(`No ${entityType}s found.`);
  }
};
