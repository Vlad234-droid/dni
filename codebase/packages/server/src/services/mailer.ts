import { getManager, DniEntityTypeEnum, getSchemaPrefix } from '@dni/database';

import { getConfig } from '../config/config-accessor';

import { spawnWorkers, standardWorkersCount } from './workers';

type CommonCcrmEntity = {
  id: number;
  slug: string;
  title: string;
  network?: CommonCcrmEntity;
  description?: string;
  content?: string;
};

type MailingData = {
  entity: CommonCcrmEntity;
  colleagueUUIDs: string[];
};

const UNSUBSCRIBE_KEY = 'unsibscribe';

const prepareMailingData = async (
  entityType: DniEntityTypeEnum,
  entityId: string,
): Promise<[string[], Record<string, string>]> => {
  const mailingData = await getMailingData(entityType, entityId);

  if (mailingData?.entity && mailingData?.colleagueUUIDs) {
    const entity = mailingData?.entity;
    const markdownEntityTitle = entity.title;
    const markdownEntityContent = entity.description || entity.content || '';
    const markdownNetworkTitle = entity.network ? entity.network!.title : 'Diversity and Inclusion';
    const linkToEntityPage = buildFrontURI(entityType, entityId);
    const linkToUnsubscribePage = buildFrontURI(UNSUBSCRIBE_KEY);

    const payload = {
      markdownTitle: markdownEntityTitle,
      markdownMessage_content: markdownEntityContent,
      Hyperlink_to_post: linkToEntityPage,
      markdownColleague_network: markdownNetworkTitle,
      UNSUBSCRIBE_URL: linkToUnsubscribePage,
      markdownEntityTitle,
      markdownEntityContent,
      linkToEntityPage,
      markdownNetworkTitle,
      linkToUnsubscribePage,
    };

    return [mailingData?.colleagueUUIDs, payload];
  }

  return [[], {}];
};

const buildFrontURI = (type: DniEntityTypeEnum | typeof UNSUBSCRIBE_KEY, entityId?: string) => {
  const {
    applicationUrlRoot,
    applicationPublicUrl,
    applicationUrlTemplatePost,
    applicationUrlTemplateEvent,
    applicationUrlUnsubscribe,
  } = getConfig();

  const baseUrl = `${applicationUrlRoot()}${applicationPublicUrl() === '/' ? '' : applicationPublicUrl()}`;
  switch (type) {
    case DniEntityTypeEnum.POST: {
      return `${baseUrl}${applicationUrlTemplatePost()}`.replace(/%\w+%/, entityId!);
    }
    case DniEntityTypeEnum.EVENT: {
      return `${baseUrl}${applicationUrlTemplateEvent()}`.replace(/%\w+%/, entityId!);
    }
    case UNSUBSCRIBE_KEY: {
      return `${baseUrl}${applicationUrlUnsubscribe()}`;
    }
    default: {
      throw new Error('Unsupported type for building URI');
    }
  }
};

const getMailingData = async (entityType: string, entityId: string): Promise<MailingData> => {
  const schemaPrefix = getSchemaPrefix();
  return (
    await getManager().connection.query(
      `SELECT 
        mailingData::json->'entity' AS entity,
        mailingData::json->'affectedColleagueUuids' AS "colleagueUUIDs"
      FROM ${schemaPrefix}fn_get_dni_user_mailing_data(
        $1::${schemaPrefix}dni_entity_type_enum,
        $2::int4
    ) mailingData`,
      [entityType, entityId],
    )
  )[0];
};

const massMailing = <T, P>(list: T[], payload: P) => {
  const workersCount = list.length <= +process.env.MAILING_CHUNK_SIZE! ? 1 : standardWorkersCount();
  spawnWorkers('colleague-sender', list, payload, workersCount);
};

export { prepareMailingData, massMailing };
