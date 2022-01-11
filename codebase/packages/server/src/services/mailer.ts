import { getManager } from '@dni/database';
import { DniEntityTypeEnum, getSchemaPrefix } from '@dni/database';

import { getConfig } from '../config/config-accessor';

import { spawnWorkers, standardWorkersCount } from './workers';

type CommonCcmsEntity = {
  id: number;
  slug: string;
  title: string;
  network?: CommonCcmsEntity;
  description?: string;
  shortDescription?: string;
  content?: string;
};

type MailingData = {
  entity: CommonCcmsEntity;
  colleagueUUIDs: string[];
};

const UNSUBSCRIBE_KEY = 'unsibscribe';

const config = getConfig();

const prepareMailingData = async (
  entityType: DniEntityTypeEnum,
  entityId: string,
): Promise<[string[], Record<string, string>]> => {
  const mailingData = await getMailingData(entityType, entityId);

  if (mailingData?.entity && mailingData?.colleagueUUIDs) {
    const entity = mailingData?.entity;
    const markdownEntityTitle = entity.title;
    const markdownEntityContent = entity.shortDescription || '';
    const markdownNetworkTitle = entity.network ? entity.network!.title : 'Diversity and Inclusion';
    const linkToEntityPage = buildFrontURI(entityType, entityId);
    const linkToUnsubscribePage = buildFrontURI(UNSUBSCRIBE_KEY);

    const payload = {
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
  const { applicationBaseUrl, applicationUrlTemplatePost, applicationUrlTemplateEvent, applicationUrlUnsubscribe } =
    config;

  const baseUrl = applicationBaseUrl();
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
      throw Error('Unsupported type for building URI');
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
  const workersCount = list.length <= config.mailingChunkSize() ? 1 : standardWorkersCount();
  spawnWorkers('colleague-sender', list, payload, workersCount);
};

export { prepareMailingData, massMailing };
