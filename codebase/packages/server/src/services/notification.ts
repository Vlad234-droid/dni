import { getManager, getSchemaPrefix, DniUserNotificationAcknowledge, DniEntityTypeEnum } from '@dni/database';

const findNotifications = (colleagueUUID: string) => {
  const schemaPrefix = getSchemaPrefix();
  return getManager().connection.query(
    `SELECT
      fn.entity_type AS "entityType",
      fn.entity_id AS "entityId",
      e.entity_instance AS "entity",
      root.entity_type AS "rootAncestorType",
      root.entity_id AS "rootAncestorId",
      root.entity_instance AS "rootAncestor",
      parent.entity_type AS "parentType",
      parent.entity_id AS "parentId",
      parent.entity_instance AS "parent",
      e.entity_created_at AS "createdAt",
      e.entity_updated_at AS "updatedAt",
      e.entity_published_at AS "publishedAt"
    FROM ${schemaPrefix}fn_get_dni_user_notification_list(
      $1::uuid,
      ARRAY['post'::${schemaPrefix}dni_entity_type_enum, 'event'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      ARRAY['network'::${schemaPrefix}dni_entity_type_enum, 'event'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
      TRUE::boolean
    ) fn
    LEFT JOIN ${schemaPrefix}ccms_entity e
    ON fn.entity_id = e.entity_id AND fn.entity_type = e.entity_type
    LEFT JOIN ${schemaPrefix}ccms_entity parent
    ON e.parent_entity_id = parent.entity_id AND e.parent_entity_type = parent.entity_type
    LEFT JOIN ${schemaPrefix}ccms_entity root
    ON fn.root_ancestor_id = root.entity_id AND fn.root_ancestor_type = root.entity_type
    ORDER BY fn.notified_at DESC`,
    [colleagueUUID],
  );
};

const findNetworkNotifications = (colleagueUUID: string) => {
  const schemaPrefix = getSchemaPrefix();
  return getManager().connection.query(
    `SELECT
      fn.entity_type AS "entityType",
      ARRAY_AGG(fn.entity_id) AS "entitiesIds",
      fn.root_ancestor_type AS "rootAncestorType",
      fn.root_ancestor_id AS "rootAncestorId",
      p.entity_instance AS "rootAncestor",
      COUNT(*) AS "count"
      FROM ${schemaPrefix}fn_get_dni_user_notification_list(
        $1::uuid,
        ARRAY['post'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
        ARRAY['network'::${schemaPrefix}dni_entity_type_enum, 'event'::${schemaPrefix}dni_entity_type_enum]::${schemaPrefix}dni_entity_type_enum[],
        TRUE::boolean
      ) fn
      LEFT JOIN ccms_entity p
      ON fn.root_ancestor_id = p.entity_id AND fn.root_ancestor_type = p.entity_type
      GROUP BY
        fn.colleague_uuid, 
        fn.root_ancestor_id, 
        fn.root_ancestor_type, 
        fn.entity_type,
        p.entity_instance
      ORDER BY max(fn.notified_at) DESC`,
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
