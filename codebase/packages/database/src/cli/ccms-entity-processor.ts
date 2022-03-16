import cliProgress from 'cli-progress';
import chalk from 'chalk';
import { Repository } from 'typeorm';

import { CommonCcmsEntity } from '../ccms';
import { getCmsEntity, getCmsEntityCount, GetCountFn, GetEntityFn } from '../ccms/utils';
import { transformEntity } from '../ccms/transformer';
import { DniEntityTypeEnum, CcmsEntity } from '../entities';


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
