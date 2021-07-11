SET search_path TO public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- !!! ----------------------------------------------------------------
-- WARNING: IF NEXT COMMAND IS UNCOMMENTED WHOLE SCHEMA WILL BE DROPPED 
DROP SCHEMA IF EXISTS "dni" CASCADE;
-- !!! ----------------------------------------------------------------

CREATE SCHEMA IF NOT EXISTS "dni";

SET search_path TO "$user", dni, public;

-- ========
-- dni_user
-- ========
--DROP TABLE IF EXISTS dni_user CASCADE;
CREATE TABLE IF NOT EXISTS dni_user (
	colleague_uuid uuid NOT NULL,
	employee_number varchar(12) NOT NULL,
	capi_properties jsonb NULL,
   setting_properties jsonb NULL,
	last_login_at timestamptz(0) NULL,
	created_at timestamptz(0) NOT NULL DEFAULT now(),
	updated_at timestamptz(0) NULL,
	CONSTRAINT "dni_user__pk" PRIMARY KEY (colleague_uuid)
);

-- Column comments
COMMENT ON COLUMN dni_user.colleague_uuid IS 'ColleagueUUID';
COMMENT ON COLUMN dni_user.employee_number IS 'a.k.a. TPX';
COMMENT ON COLUMN dni_user.capi_properties IS 'Colleague API properties';

CREATE INDEX "dni_user$created_at__idx" ON dni_user (created_at);

CREATE INDEX "dni_user$capi_properties__idx" ON dni_user USING gin(capi_properties);


-- ========================
-- dni_entity_type_enum
-- ========================
--DROP TYPE IF EXISTS dni_entity_type_enum CASCADE;
CREATE TYPE dni_entity_type_enum AS ENUM (
	'network',
	'event',
	'post',
	'partner',
	'meta-category'
	);


-- ====================
-- dni_user_action_enum
-- ====================
--DROP TYPE IF EXISTS dni_user_action_enum CASCADE;
CREATE TYPE dni_user_action_enum AS ENUM (
	'join',
	'leave'
	);


-- =====================
-- dni_user_subscription
-- =====================
--DROP TABLE IF EXISTS dni_user_subscription;
CREATE TABLE IF NOT EXISTS dni_user_subscription (
	colleague_uuid uuid NOT NULL,
	subscription_entity_id int4 NOT NULL,
	subscription_entity_type dni_entity_type_enum NOT NULL,
	created_at timestamptz(0) NOT NULL DEFAULT now(),
	CONSTRAINT "d_u_subscription$colleague_uuid__fk" FOREIGN KEY (colleague_uuid) REFERENCES dni_user(colleague_uuid),
	CONSTRAINT "d_u_subscription__pk" PRIMARY KEY (colleague_uuid, subscription_entity_type, subscription_entity_id)
);

CREATE INDEX "d_u_subscription$created_at__idx" ON dni_user_subscription (created_at);


-- =========================
-- dni_user_subscription_log
-- =========================
--DROP TABLE IF EXISTS dni_user_subscription_log;
CREATE TABLE IF NOT EXISTS dni_user_subscription_log (
	log_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
	colleague_uuid uuid NOT NULL,
	subscription_entity_id int4 NOT NULL,
	subscription_entity_type dni_entity_type_enum NOT NULL,
	user_action dni_user_action_enum NOT NULL,
	created_at timestamptz(0) NOT NULL DEFAULT now(),
	CONSTRAINT "d_u_subscription_log$colleague_uuid__fk" FOREIGN KEY (colleague_uuid) REFERENCES dni_user(colleague_uuid),
	CONSTRAINT "d_u_subscription_log__pk" PRIMARY KEY (log_uuid)
);

CREATE INDEX "d_u_subscription_log$created_at__idx" ON dni_user_subscription_log (created_at);


-- =================================
-- dni_user_notification_acknowledge
-- =================================
--DROP TABLE IF EXISTS dni_user_notification_acknowledge CASCADE;
CREATE TABLE IF NOT EXISTS dni_user_notification_acknowledge (
	acknowledge_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
	colleague_uuid uuid NOT NULL,
	acknowledge_entity_id int4 NOT NULL,
	acknowledge_entity_type dni_entity_type_enum NOT NULL,
	acknowledge_created_at timestamptz(0) NOT NULL DEFAULT now(),
	CONSTRAINT "d_u_n_acknowledge$colleague_uuid__fk" FOREIGN KEY (colleague_uuid) REFERENCES dni_user(colleague_uuid),
	CONSTRAINT "d_u_n_acknowledge__pk" PRIMARY KEY (acknowledge_uuid)
);

CREATE INDEX "d_u_n_acknowledge$acknowledge_created_at__idx" ON dni_user_notification_acknowledge USING btree (acknowledge_created_at DESC);

CREATE INDEX "d_u_n_acknowledge$colleague_uuid$a_entity_type$a_entity_id__idx" ON dni_user_notification_acknowledge USING btree (colleague_uuid, acknowledge_entity_type, acknowledge_entity_id);


-- ===========
-- capi_region
-- ===========
--DROP TABLE IF EXISTS capi_region;
CREATE TABLE IF NOT EXISTS capi_region (
	post_index_prefix varchar(8) NOT NULL,
	region_name varchar(64) NOT NULL,
	CONSTRAINT "c_region__pk" PRIMARY KEY (post_index_prefix)
);

COMMENT ON TABLE capi_region IS 'Colleague API regions dictionary';

-- \copy capi_region FROM './data/CAPI_region.csv' WITH CSV HEADER;

-- ===============
-- capi_department
-- ===============
--DROP TABLE IF EXISTS capi_department;
CREATE TABLE IF NOT EXISTS capi_department (
	capi_business_type varchar(32) NOT NULL,
	department_name varchar(64) NOT NULL,
	CONSTRAINT "c_department__pk" PRIMARY KEY (capi_business_type)
);

COMMENT ON TABLE capi_department IS 'Colleague API departments dictionary';

-- \copy capi_department FROM './data/CAPI_departments.csv' WITH CSV HEADER;

-- =================
-- ccms_trigger_enum
-- =================
--DROP TYPE IF EXISTS ccms_trigger_event_enum CASCADE;
CREATE TYPE ccms_trigger_event_enum AS ENUM (
	'created',
	'updated',
	'deleted',
	'published'
	);


-- =================
-- ccms_notification
-- =================
--DROP TABLE IF EXISTS ccms_notification CASCADE;
CREATE TABLE IF NOT EXISTS ccms_notification (
	notification_uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
	notification_trigger_event ccms_trigger_event_enum NOT NULL,
	entity_id int4 NOT NULL,
	entity_type dni_entity_type_enum NOT NULL,
	entity_created_at timestamptz(0) NOT NULL,
	entity_updated_at timestamptz(0) NULL,
	received_at timestamptz(0) NOT NULL DEFAULT now(),
	CONSTRAINT "c_notification__pk" PRIMARY KEY (notification_uuid)
);

COMMENT ON TABLE ccms_notification IS 'Collleague CMS notifications';

CREATE INDEX "c_notification$entity_received_at__idx" ON ccms_notification (received_at);

CREATE INDEX "c_notification$entity_created_at__idx" ON ccms_notification (entity_created_at);


-- ===========
-- ccms_entity
-- ===========
--DROP TABLE IF EXISTS ccms_entity;
CREATE TABLE IF NOT EXISTS ccms_entity (
	entity_id int4 NOT NULL,
	entity_type dni_entity_type_enum NOT NULL,
	slug varchar(128) NOT NULL,
	entity_instance jsonb NULL,
	entity_created_at timestamptz(0) NOT NULL,
	entity_updated_at timestamptz(0) NULL,
	entity_published_at timestamptz(0) NULL,
   entity_deleted_at timestamptz(0) NULL,
	parent_entity_id int4 NULL,
	parent_entity_type dni_entity_type_enum NULL,
	notification_uuid uuid NULL,
	notification_trigger_event ccms_trigger_event_enum NULL,
	created_at timestamptz(0) NOT NULL DEFAULT now(),
	updated_at timestamptz(0) NULL,
	CONSTRAINT "c_entity$parent_entity__fk" FOREIGN KEY (parent_entity_id, parent_entity_type) REFERENCES ccms_entity(entity_id, entity_type),
	CONSTRAINT "c_entity$notification_uuid__fk" FOREIGN KEY (notification_uuid) REFERENCES ccms_notification(notification_uuid),
	CONSTRAINT "c_entity__pk" PRIMARY KEY (entity_id, entity_type)
);

COMMENT ON TABLE ccms_entity IS 'Collleague CMS Entities cache';

CREATE INDEX "c_entity$created_at__idx" ON ccms_entity (created_at);

CREATE INDEX "c_entity$entity_created_at__idx" ON ccms_entity (entity_created_at);

CREATE INDEX "c_entity$entity_instance__idx" ON ccms_entity USING gin(entity_instance);


-- ======================
-- ccms_entity_descriptor
-- ======================
--DROP TYPE IF EXISTS ccms_entity_descriptor CASCADE;
CREATE TYPE ccms_entity_descriptor AS (
    id int4,
    type dni_entity_type_enum
);


-- ================================
-- fn_get_ccms_entity_root_ancestor
-- ================================
CREATE OR REPLACE FUNCTION fn_get_ccms_entity_root_ancestor(
     p_entity ccms_entity_descriptor, 
     p_only_published boolean DEFAULT TRUE
     )
  RETURNS ccms_entity_descriptor
  LANGUAGE plpgsql
AS $function$
DECLARE
    root_entity_id int4;
    root_entity_type dni_entity_type_enum;
BEGIN
   SET search_path TO "$user", dni, public;

   WITH RECURSIVE entities(entity_id, entity_type, parent_entity_id, parent_entity_type) AS (
      SELECT NULL::int4 AS entity_id, NULL::dni_entity_type_enum AS entity_type, parent_entity_id, parent_entity_type
      FROM ccms_entity
      WHERE entity_id = p_entity.id AND entity_type = p_entity."type"
        AND ((entity_published_at IS NOT NULL) OR (p_only_published = FALSE))
      UNION ALL
         SELECT e.entity_id, e.entity_type, e.parent_entity_id, e.parent_entity_type
         FROM ccms_entity e 
         JOIN entities
         ON  entities.parent_entity_id = e.entity_id AND entities.parent_entity_type = e.entity_type 
         WHERE ((e.entity_published_at IS NOT NULL) OR (p_only_published = FALSE))
           -- additional dummy check for circular recursion
           AND e.entity_id <> p_entity.id AND e.entity_type <> p_entity."type"
   )
   SELECT entity_id, entity_type 
   INTO root_entity_id, root_entity_type
   FROM entities
   WHERE parent_entity_type IS NULL AND parent_entity_id IS NULL
   ;
   
   RETURN ROW(root_entity_id, root_entity_type)::ccms_entity_descriptor;
END
$function$
;


-- ===================================================
-- fn_get_dni_user_recent_notification_acknowledgement
-- ===================================================
CREATE OR REPLACE FUNCTION fn_get_dni_user_recent_notification_acknowledgement(
     p_colleague_uuid uuid
     )
  RETURNS TABLE(
     colleague_uuid uuid, 
     acknowledged_entity_id int4, 
     acknowledged_entity_type dni_entity_type_enum, 
     acknowledged_at timestamptz)
  LANGUAGE plpgsql
AS $function$
BEGIN
   SET search_path TO "$user", dni, public;

   RETURN QUERY
      SELECT 
         a.colleague_uuid AS colleague_uuid, 
         a.acknowledge_entity_id AS acknowledged_entity_id, 
         a.acknowledge_entity_type AS acknowledged_entity_type, 
         max(a.acknowledge_created_at) AS acknowledged_at
      FROM dni_user_notification_acknowledge a
      WHERE a.colleague_uuid = p_colleague_uuid
      GROUP BY 
         a.colleague_uuid, 
         a.acknowledge_entity_id, 
         a.acknowledge_entity_type
      ;
END
$function$
;


-- =====================================
-- fn_get_dni_user_notification_raw_list
-- =====================================
CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_raw_list(
     p_colleague_uuid uuid, 
     p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum], 
     p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum], 
     p_return_only_non_acknowledged boolean DEFAULT true)
  RETURNS TABLE(
     colleague_uuid uuid, 
     entity_type dni_entity_type_enum, 
     entity_id integer, 
     parent_entity_type dni_entity_type_enum, 
     parent_entity_id integer, 
     root_ancestor_type dni_entity_type_enum, 
     root_ancestor_id integer, 
     notified_at timestamp with time zone, 
     acknowledged_at timestamp with time zone)
  LANGUAGE plpgsql
AS $function$
BEGIN
   SET search_path TO "$user", dni, public;

   RETURN QUERY SELECT 
      p_colleague_uuid as colleague_uuid,
      all_entities.entity_type as entity_type,
      all_entities.entity_id as entity_id,
      all_entities.parent_entity_type as parent_entity_type,
      all_entities.parent_entity_id as parent_entity_id,
      (all_entities.root_ancestor).type as root_ancestor_type,
      (all_entities.root_ancestor).id as root_ancestor_id,
      coalesce(
         all_entities.entity_updated_at, 
         all_entities.entity_published_at, 
         all_entities.entity_created_at, now()) as notified_at,
      recent_acknowledge.acknowledged_at
   FROM (
      SELECT 
         ce.entity_type,
         ce.entity_id,
         ce.parent_entity_type,
         ce.parent_entity_id,
         ce.entity_created_at,
         ce.entity_updated_at,
         ce.entity_published_at,
         ce.entity_deleted_at,
         fn_get_ccms_entity_root_ancestor(
            p_entity := ROW(ce.entity_id , ce.entity_type), 
            p_only_published := true) as root_ancestor
      FROM ccms_entity ce
      WHERE ce.entity_type = ANY(p_filter_entity_types) 
         AND ce.entity_deleted_at IS NULL 
         AND ce.entity_published_at IS NOT NULL 
   ) all_entities 
   LEFT JOIN dni_user_subscription dus 
      ON (all_entities.root_ancestor).id = dus.subscription_entity_id 
      AND (all_entities.root_ancestor).type = dus.subscription_entity_type
   LEFT JOIN fn_get_dni_user_recent_notification_acknowledgement(p_colleague_uuid) recent_acknowledge
      ON all_entities.entity_id = recent_acknowledge.acknowledged_entity_id
      AND all_entities.entity_type = recent_acknowledge.acknowledged_entity_type
   WHERE (((root_ancestor).type = ANY(p_filter_subscription_entity_types)  AND dus.colleague_uuid = p_colleague_uuid)
      OR (root_ancestor IS NULL AND dus.colleague_uuid IS NULL))
      AND (p_return_only_non_acknowledged = FALSE OR recent_acknowledge.acknowledged_at IS NULL)
   ;
END
$function$
;


-- ==========================================
-- fn_get_dni_user_notification_enriched_list
-- ==========================================
CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_enriched_list(
     p_colleague_uuid uuid, 
     p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum], 
     p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
     )
  RETURNS TABLE(
     entity_type dni_entity_type_enum, 
     entity_id integer, 
     entity_instance jsonb, 
     root_ancestor_type dni_entity_type_enum, 
     root_ancestor_id integer, 
     root_ancestor_instance jsonb, 
     parent_entity_type dni_entity_type_enum, 
     parent_entity_id integer, 
     parent_entity_instance jsonb, 
     notified_at timestamp with time zone)
  LANGUAGE plpgsql
AS $function$
BEGIN
   SET search_path TO "$user", dni, public;

   RETURN QUERY WITH 
      params AS (SELECT 
         p_colleague_uuid as colleague_uuid,
         p_filter_entity_types as filter_entity_types, 
         p_filter_subscription_entity_types as filter_subscription_entity_types, 
         TRUE::boolean as return_only_non_acknowledged
      )
   SELECT
      fn.entity_type AS entity_type,
      fn.entity_id AS entity_id,
      entity.entity_instance AS entity_instance,
      fn.root_ancestor_type AS root_ancestor_type,
      fn.root_ancestor_id AS root_ancestor_id,
      ancestor.entity_instance AS root_ancestor_instance,
      fn.parent_entity_type AS parent_entity_type,
      fn.parent_entity_id AS parent_entity_id,
      parent.entity_instance AS parent_entity_instance,
      fn.notified_at AS notified_at
   FROM params, fn_get_dni_user_notification_raw_list(
      p_colleague_uuid := colleague_uuid
      , p_filter_entity_types := filter_entity_types
      , p_filter_subscription_entity_types := filter_subscription_entity_types
      , p_return_only_non_acknowledged := return_only_non_acknowledged
   ) fn
   LEFT JOIN ccms_entity entity
   ON fn.entity_id = entity.entity_id AND fn.entity_type = entity.entity_type
   LEFT JOIN ccms_entity parent
   ON fn.parent_entity_id = parent.entity_id AND fn.parent_entity_type = parent.entity_type
   LEFT JOIN ccms_entity ancestor
   ON fn.root_ancestor_id = ancestor.entity_id AND fn.root_ancestor_type = ancestor.entity_type
   ORDER BY fn.notified_at DESC
   ;
END
$function$
;


-- ==========================================
-- fn_get_dni_user_notification_groupped_list
-- ==========================================
CREATE OR REPLACE FUNCTION fn_get_dni_user_notification_groupped_list(
     p_colleague_uuid uuid, 
     p_filter_entity_types dni_entity_type_enum[] DEFAULT ARRAY['event'::dni_entity_type_enum, 'post'::dni_entity_type_enum], 
     p_filter_subscription_entity_types dni_entity_type_enum[] DEFAULT ARRAY['network'::dni_entity_type_enum, 'event'::dni_entity_type_enum]
     )
  RETURNS TABLE(
     root_ancestor_type dni_entity_type_enum, 
     root_ancestor_id integer, 
     root_ancestor_instance jsonb, 
     details_as_object jsonb, 
     details_as_array jsonb, 
     recent_notified_at timestamp with time zone, 
     total_entities_count integer)
  LANGUAGE plpgsql
AS $function$
BEGIN
   SET search_path TO "$user", dni, public;

   RETURN QUERY WITH 
      params AS (SELECT 
         p_colleague_uuid as colleague_uuid,
         p_filter_entity_types as filter_entity_types, 
         p_filter_subscription_entity_types as filter_subscription_entity_types, 
         TRUE::boolean as return_only_non_acknowledged
      ),
      raw_notifications AS (SELECT
         fn.entity_type as entity_type,
         jsonb_agg(fn.entity_id) AS entity_ids,
         fn.root_ancestor_type AS root_ancestor_type,
         fn.root_ancestor_id AS root_ancestor_id,
         max(fn.notified_at) AS recent_notified_at,
         COUNT(*) as entities_count
      FROM params, fn_get_dni_user_notification_raw_list(
         p_colleague_uuid := colleague_uuid
         , p_filter_entity_types := filter_entity_types
         , p_filter_subscription_entity_types := filter_subscription_entity_types
         , p_return_only_non_acknowledged := return_only_non_acknowledged
      ) fn
      GROUP BY
         fn.entity_type,
         fn.colleague_uuid, 
         fn.root_ancestor_id, 
         fn.root_ancestor_type
      ),
      aggregated_notifications AS (SELECT 
         rn.root_ancestor_type,
         rn.root_ancestor_id,
         root.entity_instance as root_ancestor_instance,
         jsonb_object_agg(rn.entity_type, rn.entity_ids) as details_as_object,
         jsonb_agg(jsonb_build_object('entityType', rn.entity_type, 'entitiesIds', rn.entity_ids)) as details_as_array,
         MAX(rn.recent_notified_at) AS recent_notified_at,
         SUM(rn.entities_count) as total_entities_count
      FROM raw_notifications rn
      LEFT JOIN ccms_entity root
      ON rn.root_ancestor_id = root.entity_id AND rn.root_ancestor_type = root.entity_type
      GROUP BY
         rn.root_ancestor_type,
         rn.root_ancestor_id,
         root.entity_instance
      )
   SELECT 
      an.root_ancestor_type,
      an.root_ancestor_id,
      an.root_ancestor_instance,
      an.details_as_object,
      an.details_as_array,
      an.recent_notified_at,
      an.total_entities_count::integer as total_entities_count
   FROM aggregated_notifications an
   ORDER BY an.recent_notified_at DESC
   ;

END
$function$
;


-- ==============================
-- fn_build_dni_timeseries_report
-- ==============================
CREATE OR REPLACE FUNCTION fn_build_dni_timeseries_report(
     p_entity_type dni_entity_type_enum,
     p_entity_ids int4[] DEFAULT NULL,
     p_granularity varchar(16) DEFAULT 'day',
     p_start_date date DEFAULT CURRENT_DATE - INTERVAL '7 DAYS',
     p_end_date date DEFAULT CURRENT_DATE
     )
  RETURNS jsonb 
  LANGUAGE plpgsql
AS $function$
DECLARE
    report_jsonb jsonb;
BEGIN
   IF NOT p_granularity = ANY(ARRAY['year','quarter','month','week','day'])
   THEN
      RAISE EXCEPTION 'Invalid `p_granularity` parameter. Granularity `%` is not supported', p_granularity
         USING HINT = 'Only these are supported: `year`,`quarter`,`month`,`week`,`day`';
   END IF;
   
   IF p_entity_type IS NULL
   THEN
      RAISE EXCEPTION '`p_entity_type` parameter is required'
         USING HINT = 'These options are available: `network`, `event`';
   END IF;

   SET search_path TO "$user", dni, public;

   -- populate array of IDs, if NULL 
   /*
   IF p_entity_ids IS NULL
   THEN 
      SELECT array_agg(entity_id)
      INTO p_entity_ids
      FROM ccms_entity
      WHERE entity_type = p_entity_type
        AND entity_published_at IS NOT NULL 
        AND notification_trigger_event <> 'deleted';
   END IF;
   */
  
   WITH 
      params AS (SELECT 
         p_entity_type as entity_type,
         p_entity_ids as entity_ids, 
         p_granularity as granularity,
         p_start_date as start_date, 
         p_end_date as end_date
      ),
      period_series AS (SELECT DISTINCT 
         greatest(date_trunc(params.granularity, time_series.period_point)::date, params.start_date) period_point
      FROM 
         params,
         generate_series(params.start_date::timestamptz, params.end_date::timestamptz, INTERVAL '1 DAY') AS time_series(period_point)
      ),
      initial_stats_info AS (SELECT 
         greatest(date_trunc(params.granularity, params.start_date)::date, params.start_date) period_point, 
         dni_usl.subscription_entity_id AS entity_id,
         sum(CASE dni_usl.user_action WHEN 'join' THEN 1 WHEN 'leave' THEN -1 ELSE 0 END) subscribers_count
      FROM 
         params,
         dni_user_subscription_log dni_usl
      WHERE dni_usl.created_at::date < params.start_date
        AND dni_usl.subscription_entity_type = params.entity_type
        AND dni_usl.subscription_entity_id = ANY(params.entity_ids)
      GROUP BY
         params.granularity,
         params.start_date,
         dni_usl.subscription_entity_id
      ),
      historical_stats_info AS (SELECT
         greatest(date_trunc(params.granularity, dni_usl.created_at)::date, params.start_date) period_point,
         dni_usl.subscription_entity_id AS entity_id,
         CASE dni_usl.user_action WHEN 'join' THEN 1 ELSE 0 END AS joined_count,
         CASE dni_usl.user_action WHEN 'leave' THEN 1 ELSE 0 END AS leaved_count,
         CASE dni_usl.user_action WHEN 'join' THEN 1 WHEN 'leave' THEN -1 ELSE 0 END AS subscribers_count
      FROM 
         params,
         dni_user_subscription_log dni_usl
      WHERE dni_usl.created_at::date BETWEEN params.start_date AND params.end_date
        AND dni_usl.subscription_entity_type = params.entity_type
        AND dni_usl.subscription_entity_id = ANY(params.entity_ids)
      UNION ALL
      SELECT 
         isi.period_point,
         isi.entity_id,
         0 AS joined_count,
         0 AS leaved_count,
         isi.subscribers_count
      FROM initial_stats_info isi
      ),
      report_template AS (SELECT 
         ps.period_point,
         entities.entity_id,
         params.entity_type as entity_type
      FROM params, period_series ps
      CROSS JOIN unnest(params.entity_ids) as entities(entity_id)
      ),
      report_data AS (SELECT DISTINCT 
         rt.period_point,
         rt.entity_id,
         rt.entity_type,
         sum(coalesce(subscribers_count, 0)) OVER (PARTITION BY rt.entity_id ORDER BY rt.period_point) as subscribers,
         sum(coalesce(joined_count, 0)) OVER (PARTITION BY rt.entity_id, rt.period_point) as joined,
         sum(coalesce(joined_count, 0)) OVER (PARTITION BY rt.entity_id ORDER BY rt.period_point) as comulative_joined,
         sum(coalesce(leaved_count, 0)) OVER (PARTITION BY rt.entity_id, rt.period_point) as leaved,
         sum(coalesce(leaved_count, 0)) OVER (PARTITION BY rt.entity_id ORDER BY rt.period_point) as comulative_leaved
      FROM report_template rt
      LEFT JOIN historical_stats_info hsi 
        ON (rt.period_point = hsi.period_point and rt.entity_id = hsi.entity_id)
      ),
      report_data_json AS (SELECT 
         rd.period_point,
         jsonb_build_object(
            'period', rd.period_point, 
            'entities', jsonb_agg(jsonb_build_object(
               'entityId', rd.entity_id,
               'entityType', rd.entity_type,
               'subscribers', rd.subscribers,
               'joined', rd.joined,
               'leaved', rd.leaved
            ) order by rd.entity_id)
         ) jsonb_data
      FROM report_data rd
      GROUP BY rd.period_point
      ORDER BY rd.period_point
      ),
      report_metadata AS (SELECT 
         rd.entity_id,
         rd.entity_type,
         coalesce (isi.subscribers_count, 0) as start_subscribers,
         rd.subscribers as end_subscribers,
         rd.comulative_leaved as leaved,
         rd.comulative_joined as joined
      FROM 
         params,
         report_data rd
      LEFT JOIN initial_stats_info isi 
        ON (rd.entity_id = isi.entity_id)
      WHERE rd.period_point = date_trunc(params.granularity, params.end_date)::date
      ), 
      report_metadata_json AS (SELECT 
         jsonb_build_object(
            'granularity', params.granularity,
            'period', jsonb_build_object('from', params.start_date, 'to', params.end_date),
            'entities', jsonb_agg(jsonb_build_object(
               'entityId', rmi.entity_id,
               'entityType', rmi.entity_type,
               'startSubscribers', rmi.start_subscribers,
               'endSubscribers', rmi.end_subscribers,
               'joined', rmi.joined,
               'leaved', rmi.leaved
            ) ORDER BY rmi.entity_id)
         ) jsonb_metadata
      FROM params, report_metadata rmi
      GROUP BY 
         params.granularity, 
         params.start_date, 
         params.end_date
      )
   SELECT jsonb_build_object(
      'data', jsonb_agg(rdj.jsonb_data ORDER BY period_point),
      'metadata', (SELECT rmj.jsonb_metadata FROM report_metadata_json rmj)
      ) AS report_json
   INTO report_jsonb
   FROM report_data_json rdj;

   RETURN report_jsonb;
END
$function$
;


-- ===========================
-- fn_build_dni_regions_report
-- ===========================
CREATE OR REPLACE FUNCTION fn_build_dni_regions_report(
     p_entity_type dni_entity_type_enum,
     p_entity_ids int4[] DEFAULT NULL,
     p_start_date date DEFAULT CURRENT_DATE - INTERVAL '7 DAYS',
     p_end_date date DEFAULT CURRENT_DATE
     )
  RETURNS jsonb 
  LANGUAGE plpgsql
AS $function$
DECLARE
    report_jsonb jsonb;
BEGIN
   IF p_entity_type IS NULL
   THEN
      RAISE EXCEPTION '`p_entity_type` parameter is required'
         USING HINT = 'These options are available: `network`, `event`';
   END IF;

   SET search_path TO "$user", dni, public;

   -- populate array of IDs, if NULL 
   /*
   IF p_entity_ids IS NULL
   THEN 
      SELECT array_agg(entity_id)
      INTO p_entity_ids
      FROM ccms_entity
      WHERE entity_type = p_entity_type
        AND entity_published_at IS NOT NULL 
        AND notification_trigger_event <> 'deleted';
   END IF;
   */
  
   WITH 
      params AS (SELECT 
         p_entity_type as entity_type,
         p_entity_ids as entity_ids, 
         p_start_date as start_date, 
         p_end_date as end_date
      ),
      affected_user_regions AS (SELECT 
         dni_usl.colleague_uuid,
         ur.region_name
      FROM (
         SELECT DISTINCT
            du.colleague_uuid, 
            cr.region_name 
         FROM dni_user du
         LEFT JOIN capi_region cr
         ON upper(coalesce(left(du.capi_properties->>'addressPostcode', length(cr.post_index_prefix)), 'XX')) = upper(cr.post_index_prefix)
         ) ur
      JOIN (
         SELECT DISTINCT 
            colleague_uuid 
         FROM params, dni_user_subscription_log 
         WHERE subscription_entity_type = entity_type AND subscription_entity_id = ANY(entity_ids)
         ) dni_usl 
      ON ur.colleague_uuid = dni_usl.colleague_uuid 
      ),
      initial_stats_info AS (SELECT
         aur.region_name,
         dni_usl.subscription_entity_id AS entity_id,
         sum(CASE dni_usl.user_action WHEN 'join' THEN 1 WHEN 'leave' THEN -1 ELSE 0 END) subscribers_count
      FROM 
         params, dni_user_subscription_log dni_usl
      JOIN affected_user_regions aur
      ON dni_usl.colleague_uuid  = aur.colleague_uuid
      WHERE dni_usl.created_at::date < params.start_date
        AND dni_usl.subscription_entity_type = params.entity_type
        AND dni_usl.subscription_entity_id = ANY(params.entity_ids)
      GROUP BY
         aur.region_name,
         dni_usl.subscription_entity_id
      ),
      historical_stats_info AS (SELECT
         aur.region_name,
         dni_usl.subscription_entity_id AS entity_id,
         sum(CASE dni_usl.user_action WHEN 'join' THEN 1 ELSE 0 END) AS joined_count,
         sum(CASE dni_usl.user_action WHEN 'leave' THEN 1 ELSE 0 END) AS leaved_count,
         sum(CASE dni_usl.user_action WHEN 'join' THEN 1 WHEN 'leave' THEN -1 ELSE 0 END) AS subscribers_count
      FROM 
         params, dni_user_subscription_log dni_usl
      JOIN affected_user_regions aur
      ON dni_usl.colleague_uuid  = aur.colleague_uuid
      WHERE dni_usl.created_at::date BETWEEN params.start_date AND params.end_date
        AND dni_usl.subscription_entity_type = params.entity_type
        AND dni_usl.subscription_entity_id = ANY(params.entity_ids)
      GROUP BY
         aur.region_name,
         dni_usl.subscription_entity_id
      ),
      report_template AS (SELECT 
         r.region_name,
         entities.entity_id
      FROM params, (SELECT DISTINCT region_name FROM capi_region /*affected_user_regions*/) r
      CROSS JOIN unnest(params.entity_ids) as entities(entity_id)
      ),
      report_data AS (SELECT  
         rt.region_name,
         rt.entity_id,
         coalesce(isi.subscribers_count, 0) as start_subscribers,
         coalesce(isi.subscribers_count, 0) + coalesce(hsi.subscribers_count, 0) as end_subscribers,
         coalesce(hsi.joined_count, 0) as joined,
         coalesce(hsi.leaved_count, 0) as leaved
      FROM report_template rt
      LEFT JOIN initial_stats_info isi 
        ON (rt.region_name = isi.region_name and rt.entity_id = isi.entity_id)
      LEFT JOIN historical_stats_info hsi 
        ON (rt.region_name = hsi.region_name and rt.entity_id = hsi.entity_id)
      ),
      report_data_json AS (SELECT 
         rd.entity_id,
         jsonb_build_object(
            'entityId', rd.entity_id, 
            'entityType', params.entity_type, 
            'entities', jsonb_agg(jsonb_build_object(
               'regionName', rd.region_name,
               'startSubscribers', rd.start_subscribers,
               'endSubscribers', rd.end_subscribers,
               'joined', rd.joined,
               'leaved', rd.leaved
            ) order by rd.region_name)
         ) jsonb_data
      FROM params, report_data rd
      GROUP BY params.entity_type, rd.entity_id
      ORDER BY rd.entity_id
      ),
      report_metadata AS (SELECT  
         rt.entity_id,
         sum(coalesce(isi.subscribers_count, 0)) as total_start_subscribers,
         sum(coalesce(isi.subscribers_count, 0) + coalesce(hsi.subscribers_count, 0)) as total_end_subscribers,
         sum(coalesce(hsi.joined_count, 0)) as total_joined,
         sum(coalesce(hsi.leaved_count, 0)) as total_leaved
      FROM report_template rt
      LEFT JOIN initial_stats_info isi 
        ON (rt.region_name = isi.region_name and rt.entity_id = isi.entity_id)
      LEFT JOIN historical_stats_info hsi 
        ON (rt.region_name = hsi.region_name and rt.entity_id = hsi.entity_id)
      GROUP BY rt.entity_id
      ),
      report_metadata_json AS (SELECT 
         jsonb_build_object(
            'period', jsonb_build_object('from', params.start_date, 'to', params.end_date),
            'entities', coalesce(jsonb_agg(jsonb_build_object(
               'entityId', rm.entity_id,
               'entityType', params.entity_type,
               'startSubscribers', rm.total_start_subscribers,
               'endSubscribers', rm.total_end_subscribers,
               'joined', rm.total_joined,
               'leaved', rm.total_leaved
            ) ORDER BY rm.entity_id), to_jsonb('{}'::text[]))
         ) jsonb_metadata
      FROM params, report_metadata rm
      GROUP BY params.start_date, params.end_date
      )
   SELECT jsonb_build_object(
      'data', coalesce(jsonb_agg(rdj.jsonb_data ORDER BY entity_id), to_jsonb('{}'::text[])),
      'metadata', (SELECT rmj.jsonb_metadata FROM report_metadata_json rmj)
      ) AS report_json
   INTO report_jsonb
   FROM report_data_json rdj;

   RETURN report_jsonb;
END
$function$
;


-- ===============================
-- fn_build_dni_departments_report
-- ===============================
CREATE OR REPLACE FUNCTION fn_build_dni_departments_report(
     p_entity_type dni_entity_type_enum,
     p_entity_ids int4[] DEFAULT NULL,
     p_start_date date DEFAULT CURRENT_DATE - INTERVAL '7 DAYS',
     p_end_date date DEFAULT CURRENT_DATE
     )
  RETURNS jsonb 
  LANGUAGE plpgsql
AS $function$
DECLARE
    report_jsonb jsonb;
BEGIN
   IF p_entity_type IS NULL
   THEN
      RAISE EXCEPTION '`p_entity_type` parameter is required'
         USING HINT = 'These options are available: `network`, `event`';
   END IF;

   SET search_path TO "$user", dni, public;

   -- populate array of IDs, if NULL 
   /*
   IF p_entity_ids IS NULL
   THEN 
      SELECT array_agg(entity_id)
      INTO p_entity_ids
      FROM ccms_entity
      WHERE entity_type = p_entity_type
        AND entity_published_at IS NOT NULL 
        AND notification_trigger_event <> 'deleted';
   END IF;
   */
  
   WITH 
      params AS (SELECT 
         p_entity_type as entity_type,
         p_entity_ids as entity_ids, 
         p_start_date as start_date, 
         p_end_date as end_date
      ),
      affected_user_departments AS (SELECT 
         dni_usl.colleague_uuid,
         ud.department_name
      FROM (
         SELECT DISTINCT
            du.colleague_uuid, 
            coalesce(cd.department_name, 'Unknown') as department_name
         FROM dni_user du
         LEFT JOIN capi_department cd 
         ON upper(du.capi_properties->>'businessType') = upper(cd.capi_business_type)
         ) ud
      JOIN (
         SELECT DISTINCT 
            colleague_uuid 
         FROM params, dni_user_subscription_log 
         WHERE subscription_entity_type = params.entity_type AND subscription_entity_id = ANY(params.entity_ids)
         ) dni_usl 
      ON ud.colleague_uuid = dni_usl.colleague_uuid 
      ),
      initial_stats_info AS (SELECT
         aud.department_name,
         dni_usl.subscription_entity_id AS entity_id,
         sum(CASE dni_usl.user_action WHEN 'join' THEN 1 WHEN 'leave' THEN -1 ELSE 0 END) subscribers_count
      FROM 
         params, dni_user_subscription_log dni_usl
      JOIN affected_user_departments aud
      ON dni_usl.colleague_uuid  = aud.colleague_uuid
      WHERE dni_usl.created_at::date < params.start_date
        AND dni_usl.subscription_entity_type = params.entity_type
        AND dni_usl.subscription_entity_id = ANY(params.entity_ids)
      GROUP BY
         aud.department_name,
         dni_usl.subscription_entity_id
      ),
      historical_stats_info AS (SELECT
         aud.department_name,
         dni_usl.subscription_entity_id AS entity_id,
         sum(CASE dni_usl.user_action WHEN 'join' THEN 1 ELSE 0 END) AS joined_count,
         sum(CASE dni_usl.user_action WHEN 'leave' THEN 1 ELSE 0 END) AS leaved_count,
         sum(CASE dni_usl.user_action WHEN 'join' THEN 1 WHEN 'leave' THEN -1 ELSE 0 END) AS subscribers_count
      FROM 
         params, dni_user_subscription_log dni_usl
      JOIN affected_user_departments aud
      ON dni_usl.colleague_uuid  = aud.colleague_uuid
      WHERE dni_usl.created_at::date BETWEEN params.start_date AND params.end_date
        AND dni_usl.subscription_entity_type = params.entity_type
        AND dni_usl.subscription_entity_id = ANY(params.entity_ids)
      GROUP BY
         aud.department_name,
         dni_usl.subscription_entity_id
      ),
      report_template AS (SELECT 
         d.department_name,
         entities.entity_id
      FROM params, (SELECT DISTINCT department_name FROM capi_department /*affected_user_departments*/) d
      CROSS JOIN unnest(params.entity_ids) as entities(entity_id)
      ),
      report_data AS (SELECT  
         rt.department_name,
         rt.entity_id,
         coalesce(isi.subscribers_count, 0) as start_subscribers,
         coalesce(isi.subscribers_count, 0) + coalesce(hsi.subscribers_count, 0) as end_subscribers,
         coalesce(hsi.joined_count, 0) as joined,
         coalesce(hsi.leaved_count, 0) as leaved
      FROM report_template rt
      LEFT JOIN initial_stats_info isi 
        ON (rt.department_name = isi.department_name and rt.entity_id = isi.entity_id)
      LEFT JOIN historical_stats_info hsi 
        ON (rt.department_name = hsi.department_name and rt.entity_id = hsi.entity_id)
      ),
      report_data_json AS (SELECT 
         rd.entity_id,
         jsonb_build_object(
            'entityId', rd.entity_id, 
            'entityType', params.entity_type, 
            'entities', jsonb_agg(jsonb_build_object(
               'departmentName', rd.department_name,
               'startSubscribers', rd.start_subscribers,
               'endSubscribers', rd.end_subscribers,
               'joined', rd.joined,
               'leaved', rd.leaved
            ) order by rd.department_name)
         ) jsonb_data
      FROM params, report_data rd
      GROUP BY params.entity_type, rd.entity_id
      ORDER BY rd.entity_id
      ),
      report_metadata AS (SELECT  
         rt.entity_id,
         sum(coalesce(isi.subscribers_count, 0)) as total_start_subscribers,
         sum(coalesce(isi.subscribers_count, 0) + coalesce(hsi.subscribers_count, 0)) as total_end_subscribers,
         sum(coalesce(hsi.joined_count, 0)) as total_joined,
         sum(coalesce(hsi.leaved_count, 0)) as total_leaved
      FROM report_template rt
      LEFT JOIN initial_stats_info isi 
        ON (rt.department_name = isi.department_name and rt.entity_id = isi.entity_id)
      LEFT JOIN historical_stats_info hsi 
        ON (rt.department_name = hsi.department_name and rt.entity_id = hsi.entity_id)
      GROUP BY rt.entity_id
      ),
      report_metadata_json AS (SELECT 
         jsonb_build_object(
            'period', jsonb_build_object('from', params.start_date, 'to', params.end_date),
            'entities', coalesce(jsonb_agg(jsonb_build_object(
               'entityId', rm.entity_id,
               'entityType', params.entity_type,
               'startSubscribers', rm.total_start_subscribers,
               'endSubscribers', rm.total_end_subscribers,
               'joined', rm.total_joined,
               'leaved', rm.total_leaved
            ) ORDER BY rm.entity_id), to_jsonb('{}'::text[]))
         ) jsonb_metadata
      FROM params, report_metadata rm
      GROUP BY params.start_date, params.end_date
      )

   SELECT jsonb_build_object(
      'data', coalesce(jsonb_agg(rdj.jsonb_data ORDER BY entity_id), to_jsonb('{}'::text[])),
      'metadata', (SELECT rmj.jsonb_metadata FROM report_metadata_json rmj)
      ) AS report_json
   INTO report_jsonb
   FROM report_data_json rdj;

   RETURN report_jsonb;
END
$function$
;


-- ==================================
-- fn_perform_dni_colleague_data_wipe
-- ----------------------------------
-- WARNING!!!
-- THIS IS DATA WIPE FUNCTION 
-- USE CARREFULLY
-- ==================================
CREATE OR REPLACE FUNCTION fn_perform_dni_colleague_data_wipe(
     p_retention_period varchar(32) DEFAULT '6 month'
     )
  RETURNS jsonb 
  LANGUAGE plpgsql
AS $function$
DECLARE
    report_jsonb jsonb;
BEGIN
   SET search_path TO "$user", dni, public;

   WITH 
      params AS (SELECT
         p_retention_period::varchar AS retention_period
      ),
      affected_colleague_ids AS (SELECT 
         colleague_uuid 
      FROM params, dni_user du
      WHERE ((du.capi_properties->>'leavingDate')::date + params.retention_period::INTERVAL) < now()
         OR (du.last_login_at + params.retention_period::INTERVAL) < now()
      ),
      dusl_deleted AS (
         DELETE FROM dni_user_subscription_log dusl 
         WHERE dusl.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
         RETURNING dusl.log_uuid
      ),
      dus_deleted as (
         DELETE FROM dni_user_subscription dus
         WHERE dus.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
         RETURNING colleague_uuid, subscription_entity_type, subscription_entity_id
      ),
      duna_deleted AS (
         DELETE FROM dni_user_notification_acknowledge duna 
         WHERE duna.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
         RETURNING duna.acknowledge_uuid
      ),
      du_deleted as (
         DELETE FROM dni_user du
         WHERE du.colleague_uuid IN (SELECT colleague_uuid FROM affected_colleague_ids)
         RETURNING colleague_uuid
      )
   SELECT jsonb_build_object(
      'dni_user_subscription_log_deleted', (SELECT count(*) FROM dusl_deleted),
      'dni_user_subscription_deleted', (SELECT count(*) FROM dus_deleted),
      'dni_user_notification_acknowledge_deleted', (SELECT count(*) FROM duna_deleted),
      'dni_user_deleted', (SELECT count(*) FROM du_deleted)
      )
   INTO report_jsonb;

   RETURN report_jsonb;
END
$function$
;
