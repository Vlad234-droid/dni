import { objectToCamel } from '@dni-common/object-utils';

import { getManager, getSchemaPrefix, serializeEnum } from '@dni/database';
import { DniEntityTypeEnum } from '@dni/database';

const NOTIFICATION_RETENTION_INTERVAL = '3 month';

export const colleagueNotificationsList = async (
  colleagueUUID: string,
) => {
  const schemaPrefix = getSchemaPrefix();
  const enrichedNotificationList = await getManager().connection.query(
    `SELECT 
        entity_type
      , entity_id
      , entity_instance
      , ancestor_type
      , ancestor_id
      , ancestor_instance
      , notified_at
      , acknowledged_at
    FROM ${schemaPrefix}fn_get_dni_user_notification_enriched_list_2(
        p_colleague_uuid := $1::uuid
      , p_filter_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.EVENT, DniEntityTypeEnum.POST])}
      , p_filter_subscription_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.NETWORK, DniEntityTypeEnum.EVENT])}
      , p_filter_root_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.NETWORK])}
      , p_return_only_non_acknowledged := TRUE
      , p_return_only_one_ancestor_per_entity := TRUE
      , p_affected_interval := $2::INTERVAL)`,
    [colleagueUUID, NOTIFICATION_RETENTION_INTERVAL],
  );

  if (Array.isArray(enrichedNotificationList) && enrichedNotificationList.length) {
    return enrichedNotificationList.map(enl => objectToCamel(enl));
  } else {
    return [];
  }
};

export const colleagueNotificationsGroupBy = async (
  colleagueUUID: string, 
  groupBy: DniEntityTypeEnum[] = [DniEntityTypeEnum.NETWORK],
) => {

  const schemaPrefix = getSchemaPrefix();
  const grouppedNotificationList = await getManager().connection.query(
    `SELECT 
        ancestor_type
      , ancestor_id
      , ancestor_instance
      , recent_notified_at
      , nested_total
      , nested_as_array
    FROM ${schemaPrefix}fn_get_dni_user_notification_groupped_list_2(
        p_colleague_uuid := $1::uuid
      , p_filter_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.EVENT, DniEntityTypeEnum.POST])}
      , p_filter_subscription_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.NETWORK, DniEntityTypeEnum.EVENT])}
      , p_filter_root_entity_types := ${serializeEnum('dni_entity_type_enum', groupBy)}
      , p_return_only_non_acknowledged := TRUE
      , p_return_only_one_ancestor_per_entity := TRUE
      , p_affected_interval := $2::INTERVAL)`,
    [colleagueUUID, NOTIFICATION_RETENTION_INTERVAL],
  );

  if (Array.isArray(grouppedNotificationList) && grouppedNotificationList.length) {
    return grouppedNotificationList.map(gnl => objectToCamel(gnl));
  } else {
    return [];
  }
};

export const createColleagueNotificationAcknowledgement = async (
  entityId: number,
  entityType: DniEntityTypeEnum,
  colleagueUUID: string,
) => {
  const schemaPrefix = getSchemaPrefix();
  const notificationAcknowledge = await getManager().connection.query(`
    INSERT INTO 
      ${schemaPrefix}dni_user_notification_acknowledge(colleague_uuid, acknowledge_entity_id, acknowledge_entity_type)
    VALUES($1, $2, $3)
    ON CONFLICT ON CONSTRAINT "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__uq" DO 
    UPDATE SET acknowledge_created_at=now()
    WHERE dni_user_notification_acknowledge.colleague_uuid = $1
      AND dni_user_notification_acknowledge.acknowledge_entity_id = $2
      AND dni_user_notification_acknowledge.acknowledge_entity_type = $3
    RETURNING 
      acknowledge_uuid AS "acknowledgeUUID", 
      colleague_uuid AS "colleagueUUID", 
      acknowledge_entity_id AS "acknowledgeEntityId", 
      acknowledge_entity_type AS "acknowledgeEntityType", 
      acknowledge_created_at AS "acknowledgeCreatedAt"`,
    [colleagueUUID, entityId, entityType],
  );

  if (Array.isArray(notificationAcknowledge) && notificationAcknowledge.length === 1) 
    return notificationAcknowledge[0];
  else {
    throw new Error('[createColleagueNotificationAcknowledgement]: Unexpected resposnse from DB');
  }
};
