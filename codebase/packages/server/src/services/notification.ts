import { getManager, getSchemaPrefix, serializeEnum } from '@dni/database';
import { DniEntityTypeEnum } from '@dni/database';

const NOTIFICATION_RETENTION_INTERVAL = '3 month';

export const colleagueNotificationsList = async (
  colleagueUUID: string,
) => {
  const schemaPrefix = getSchemaPrefix();
  const enrichedNotificationList = await getManager().connection.query(
    `SELECT 
        entity_type AS "entityType"
      , entity_id AS "entityId"
      , entity_instance AS "entityInstance"
      , ancestor_type AS "ancestorType"
      , ancestor_id AS "ancestorId"
      , ancestor_instance AS "ancestorInstance"
      , notified_at AS "notifiedAt"
      , acknowledged_at AS "acknowledgedAt"
    FROM ${schemaPrefix}fn_get_dni_user_notification_enriched_list_3(
        p_colleague_uuid := $1::uuid
      , p_filter_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.EVENT, DniEntityTypeEnum.POST])}
      , p_filter_subscription_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.NETWORK, DniEntityTypeEnum.EVENT])}
      , p_filter_root_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.NETWORK])}
      , p_return_only_non_acknowledged := TRUE
      , p_return_only_one_ancestor_per_entity := TRUE
      , p_affected_interval := $2::INTERVAL
      , p_object_case_enum := 'camelcase'::${schemaPrefix}jsonb_object_case_enum
      )`,
    [colleagueUUID, NOTIFICATION_RETENTION_INTERVAL],
  );

  return enrichedNotificationList || [];
};

export const colleagueNotificationsGroupBy = async (
  colleagueUUID: string, 
  groupBy: DniEntityTypeEnum[] = [DniEntityTypeEnum.NETWORK],
) => {

  const schemaPrefix = getSchemaPrefix();
  const grouppedNotificationList = await getManager().connection.query(
    `SELECT 
        ancestor_type AS "ancestorType"
      , ancestor_id AS "ancestorId"
      , ancestor_instance AS "ancestorInstance"
      , recent_notified_at AS "recentNotifiedAt"
      , nested_entities_total AS "nestedEntitiesTotal"
      , nested_entities AS "nestedEntities"
    FROM ${schemaPrefix}fn_get_dni_user_notification_groupped_list_3(
        p_colleague_uuid := $1::uuid
      , p_filter_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.EVENT, DniEntityTypeEnum.POST])}
      , p_filter_subscription_entity_types := ${serializeEnum('dni_entity_type_enum', [DniEntityTypeEnum.NETWORK, DniEntityTypeEnum.EVENT])}
      , p_filter_root_entity_types := ${serializeEnum('dni_entity_type_enum', groupBy)}
      , p_return_only_non_acknowledged := TRUE
      , p_return_only_one_ancestor_per_entity := TRUE
      , p_affected_interval := $2::INTERVAL
      , p_object_case_enum := 'camelcase'::${schemaPrefix}jsonb_object_case_enum
      )`,
    [colleagueUUID, NOTIFICATION_RETENTION_INTERVAL],
  );

  return grouppedNotificationList || [];
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
    throw Error('[createColleagueNotificationAcknowledgement]: Unexpected resposnse from DB');
  }
};
