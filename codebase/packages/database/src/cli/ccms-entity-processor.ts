import cliProgress from 'cli-progress';
import chalk from 'chalk';
import { Repository } from 'typeorm';

import { ApiInput, BaseApiParams } from '@dni-connectors/colleague-cms-api';

import { CommonCcmsEntity } from '../ccms';
import { DniEntityTypeEnum, CcmsEntity } from '../entities';
import { transformEntity } from '../ccms/transformer';

type GetCountFn = (query: ApiInput<BaseApiParams>) => Promise<{ data: number }>;
type GetEntityFn<T> = (query: ApiInput<BaseApiParams>) => Promise<{ data: Array<T> }>;

/**
 * 
 * @param getCountFn 
 * @returns 
 */
const getCmsEntityCount = async (getCountFn: GetCountFn): Promise<number> => {
  const countQuery: ApiInput<BaseApiParams> = {
    params: {
      _publicationState: 'preview',
    },
  };

  const ccmsResponse = await getCountFn(countQuery);
  return ccmsResponse.data;
};

/**
 * 
 * @param offset 
 * @param count 
 * @param getEntityFn 
 * @returns 
 */
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
      if (Array.isArray(entities) && entities.length === 1) {
        const entity = entities[0];
        const ccmsEntity = repository.create({
          entityId: entity.id,
          entityType,
          ...transformEntity(entity as CommonCcmsEntity<string>),
          entityCreatedAt: entity.created_at || entity.published_at || new Date(),
          entityUpdatedAt: entity.updated_at || entity.published_at,
          entityPublishedAt: entity.published_at,
        });
  
        await repository.save(ccmsEntity);
      }

      progressBar.increment();
      progressBar.updateETA();
    }

    progressBar.stop();
  } else {
    console.log(`No ${entityType}s found.`);
  }
};
