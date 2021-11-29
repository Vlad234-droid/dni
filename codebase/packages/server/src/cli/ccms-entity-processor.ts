import cliProgress from 'cli-progress';
import chalk from 'chalk';
import { Repository } from 'typeorm';

import { DniEntityTypeEnum, CcmsEntity, slugify } from '@dni/database';
import { ApiInput, BaseApiParams } from '@dni-connectors/colleague-cms-api';

interface CommonEntity {
  id: number;
  slug: string;
  title: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  network?: CommonEntity | CommonEntity[];
  event?: CommonEntity | CommonEntity[];
}

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
  getEntityFn: GetEntityFn<CommonEntity>,
): Promise<Array<CommonEntity>> => {
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
  entity: CommonEntity,
): CcmsEntity => {
  const getParent = () => {
    const parentEvent = Array.isArray(entity.event) && entity.event.length > 0 ? entity.event[0] : entity.event as CommonEntity | undefined;
    const parentNetwork = Array.isArray(entity.network) && entity.network.length > 0 ? entity.network[0] : entity.network as CommonEntity | undefined;
    if (parentEvent || parentNetwork) {
      return {
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
  getEntityFn: GetEntityFn<CommonEntity>,
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

      const ccmsEntity = convertToCcmsEntity(repository, entityType, entity as CommonEntity);
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
