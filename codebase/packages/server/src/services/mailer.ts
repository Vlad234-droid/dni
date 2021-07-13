import { getManager, DniEntityTypeEnum, getSchemaPrefix } from '@dni/database';
import { spawnWorkers, standardWorkersCount } from './workers';

type CommonCcrmEntity = {
  id: number;
  slug: string;
  title: string;
  network?: CommonCcrmEntity;
  description: string;
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
    const payload = {
      markdownTitle: entity.title,
      markdownMessage_content: entity.description,
      Hyperlink_to_post: buildFrontURI(entityType, entityId),
      markdownColleague_network: entity.network!.title,
      UNSUBSCRIBE_URL: buildFrontURI(UNSUBSCRIBE_KEY, entityId),
    };

    return [mailingData?.colleagueUUIDs, payload];
  }

  return [[], {}];
};

const buildFrontURI = (type: DniEntityTypeEnum | typeof UNSUBSCRIBE_KEY, entityId: string) => {
  const { DNI_APP_URL, PUBLIC_URL, DNI_APP_POST_URL, DNI_APP_EVENT_URL, DNI_APP_UNSUBSCRIBE_URL } = process.env;

  if (!(DNI_APP_URL && PUBLIC_URL && DNI_APP_POST_URL && DNI_APP_EVENT_URL && DNI_APP_UNSUBSCRIBE_URL)) {
    throw new Error(`Needs front-end integration configuration:
      DNI_APP_URL: ${DNI_APP_URL};
      PUBLIC_URL: ${PUBLIC_URL};
      DNI_APP_POST_URL: ${DNI_APP_POST_URL};
      DNI_APP_EVENT_URL: ${DNI_APP_EVENT_URL};
      DNI_APP_UNSUBSCRIBE_URL: ${DNI_APP_UNSUBSCRIBE_URL};
    `);
  }

  const baseURL = `${DNI_APP_URL}${PUBLIC_URL == '/' ? '' : PUBLIC_URL}`;
  switch (type) {
    case DniEntityTypeEnum.POST: {
      return `${baseURL}${DNI_APP_POST_URL}`.replace(/%\w+%/, entityId);
    }
    case DniEntityTypeEnum.EVENT: {
      return `${baseURL}${DNI_APP_EVENT_URL}`.replace(/%\w+%/, entityId);
    }
    case UNSUBSCRIBE_KEY: {
      return `${baseURL}${DNI_APP_UNSUBSCRIBE_URL}`;
    }
    default:
      throw new Error('Unsupported type for building URI');
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
  const workersCount = list.length <= +process.env.MAIL_SEND_CHUNKS_NUMBER! ? 1 : standardWorkersCount();
  spawnWorkers('colleague-sender', list, payload, workersCount);
};

export { prepareMailingData, massMailing };
