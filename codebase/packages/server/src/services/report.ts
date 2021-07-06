import { getManager, getSchemaPrefix } from '@dni/database';

const getMembersReportBy = async (
  entityType: string,
  entityIds: string[],
  granularity: string,
  from: string,
  to: string,
) => {
  const schemaPrefix = getSchemaPrefix();
  return (
    await getManager().connection.query(
      `SELECT
        report::json->'data' AS data,
        report::json->'metadata' AS metadata
      FROM ${schemaPrefix}fn_build_dni_timeseries_report(
        $1::${schemaPrefix}dni_entity_type_enum,
        $2::int4[],
        $3::varchar,
        $4::date,
        $5::date
    ) AS report`,
      [entityType, entityIds, granularity, from, to],
    )
  )[0];
};

const getRegionsReportBy = async (entityType: string, entityIds: string[], from: string, to: string) => {
  const schemaPrefix = getSchemaPrefix();
  return (
    await getManager().connection.query(
      `SELECT
        report::json->'data' AS data,
        report::json->'metadata' AS metadata
      FROM ${schemaPrefix}fn_build_dni_regions_report(
        $1::${schemaPrefix}dni_entity_type_enum,
        $2::int4[],
        $3::date,
        $4::date
    ) AS report`,
      [entityType, entityIds, from, to],
    )
  )[0];
};

const getDepartmentsReportBy = async (entityType: string, entityIds: string[], from: string, to: string) => {
  const schemaPrefix = getSchemaPrefix();
  return (
    await getManager().connection.query(
      `SELECT
        report::json->'data' AS data,
        report::json->'metadata' AS metadata
      FROM ${schemaPrefix}fn_build_dni_departments_report(
        $1::${schemaPrefix}dni_entity_type_enum,
        $2::int4[],
        $3::date,
        $4::date
    ) AS report`,
      [entityType, entityIds, from, to],
    )
  )[0];
};

export { getMembersReportBy, getRegionsReportBy, getDepartmentsReportBy };
