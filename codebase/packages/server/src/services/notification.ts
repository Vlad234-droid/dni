import { getManager, getSchemaPrefix, DniUserNotificationAcknowledge, DniEntityTypeEnum } from '@dni/database';

const findNotifications = async (colleagueUUID: string) => {
  const schemaPrefix = getSchemaPrefix();
  const enrichedNotificationList = await getManager().connection.query(
    `SELECT 
        entity_type AS "entityType",
        entity_id AS "entityId",
        entity_instance AS "entity",
        root_ancestor_type AS "rootAncestorType",
        root_ancestor_id AS "rootAncestorId",
        root_ancestor_instance AS "rootAncestor",
        parent_entity_type AS "parentEntityType",
        parent_entity_id AS "parentEntityId",
        parent_entity_instance AS "parentEntity",
        notified_at AS "notifiedAt"
    FROM ${schemaPrefix}fn_get_dni_user_notification_enriched_list(
      p_colleague_uuid := $1::uuid, 
      p_filter_entity_types := ARRAY['post'::${schemaPrefix}dni_entity_type_enum, 'event'::${schemaPrefix}dni_entity_type_enum],
      p_filter_subscription_entity_types := ARRAY['network'::${schemaPrefix}dni_entity_type_enum, 'event'::${schemaPrefix}dni_entity_type_enum]
    ) WHERE notified_at > CURRENT_DATE - INTERVAL '3 months'`,
    [colleagueUUID],
  );

  return enrichedNotificationList;
};

const findNetworkNotifications = async (colleagueUUID: string) => {
  const schemaPrefix = getSchemaPrefix();
  const grouppedNotificationList = await getManager().connection.query(
    `SELECT 
        root_ancestor_type AS "rootAncestorType",
        root_ancestor_id AS "rootAncestorId",
        root_ancestor_instance AS "rootAncestor",
        details_as_array AS "entitiesDetails", 
        recent_notified_at AS "recentNotifiedAt",
        total_entities_count AS "totalEntitiesCount"
    FROM ${schemaPrefix}fn_get_dni_user_notification_groupped_list(
      p_colleague_uuid := $1::uuid, 
      p_filter_entity_types := ARRAY['post'::${schemaPrefix}dni_entity_type_enum, 'event'::${schemaPrefix}dni_entity_type_enum],
      p_filter_subscription_entity_types := ARRAY['network'::${schemaPrefix}dni_entity_type_enum, 'event'::${schemaPrefix}dni_entity_type_enum]
    )
    WHERE root_ancestor_type IS NULL OR root_ancestor_type = 'network'::${schemaPrefix}dni_entity_type_enum`,
    [colleagueUUID],
  );

  return grouppedNotificationList;
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
