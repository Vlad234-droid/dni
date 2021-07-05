import {
  getManager,
  getSchemaPrefix,
  DniUserNotificationAcknowledge,
  DniEntityTypeEnum,
} from '@dni/database';


const findNotifications = (colleagueUUID: string) => {
  const schemaPrefix = getSchemaPrefix();
  return getManager().connection.query(
    `SELECT
      colleague_uuid, 
      entity_id,
      entity_type,
      root_ancestor_id,
      root_ancestor_type
    FROM ${schemaPrefix}fn_get_dni_user_notification_list(
      $1::uuid,
      ARRAY['event'::${schemaPrefix}dni_entity_type_enum, 'post'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      ARRAY['network'::${schemaPrefix}dni_entity_type_enum, 'event'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      TRUE::boolean
    )`,
    [colleagueUUID],
  );
};

const findNetworkNotifications = (colleagueUUID: string) => {
  const schemaPrefix = getSchemaPrefix();
  return getManager().connection.query(
    `SELECT
      colleague_uuid uuid, 
      entity_type,
      root_ancestor_id, 
      root_ancestor_type, 
      count(*) as entity_count
    FROM ${schemaPrefix}fn_get_dni_user_notification_list(
      $1::uuid,
      ARRAY['post'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      ARRAY['network'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      TRUE::boolean
    )
    GROUP BY
      colleague_uuid, 
      root_ancestor_id, 
      root_ancestor_type, 
      entity_type`,
    [colleagueUUID],
  );
};

const createColleagueNotificationRelation = async (
  entityId: number,
  entityType: DniEntityTypeEnum,
  colleagueUUID: string,
) => {
  return await getManager().getRepository(DniUserNotificationAcknowledge).save({
    colleagueUUID,
    acknowledgeEntityType: entityType,
    acknowledgeEntityId: entityId,
  });
};

export { findNotifications, findNetworkNotifications, createColleagueNotificationRelation };
