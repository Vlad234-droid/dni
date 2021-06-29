import { getManager } from '@dni/database';

const getMembersReportBy = async (
  entityType: string,
  entityIds: string[],
  groupBy: string,
  from: string,
  to: string,
) => {
  return (
    await getManager().connection.query(
      `SELECT
        report::json->'data' AS data,
        report::json->'metadata' AS metadata
    FROM fn_build_dni_members_report(
        $1::dni_entity_type_enum,
        $2::int4[],
        $3,
        $4::date,
        $5::date
    ) AS report`,
      [entityType, entityIds, groupBy, from, to],
    )
  )[0];
};

const getRegionsReportBy = async (entityType: string, entityIds: string[], from: string, to: string) => {
  return (
    await getManager().connection.query(
      `SELECT
        report::json->'data' AS data,
        report::json->'metadata' AS metadata
    FROM fn_build_dni_regions_report(
        $1::dni_entity_type_enum,
        $2::int4[],
        $3::date,
        $4::date
    ) AS report`,
      [entityType, entityIds, from, to],
    )
  )[0];
};

const getDepartmentsReportBy = async (entityType: string, entityIds: string[], from: string, to: string) => {
  return (
    await getManager().connection.query(
      `SELECT
        report::json->'data' AS data,
        report::json->'metadata' AS metadata
    FROM fn_build_dni_departments_report(
        $1::dni_entity_type_enum,
        $2::int4[],
        $3::date,
        $4::date
    ) AS report`,
      [entityType, entityIds, from, to],
    )
  )[0];
};

export { getMembersReportBy, getRegionsReportBy, getDepartmentsReportBy };
