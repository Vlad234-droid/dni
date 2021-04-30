import { getManager } from '@dni/database';

const getReportBy = async (
  entityType: string,
  entityIds: string[],
  groupBy: string,
  from: string,
  to: string,
) => {
  return await getManager().connection.query(
    `with params as (select $1 as entity_type,
                                $2::int[] as entity_ids, $3 as groupBy,
                                $4::date  as start_date, $5::date    as end_date),
              periods as (SELECT distinct date_trunc(params.groupBy, t.period) ::date period_date
                          FROM params,
                               generate_series("timestamp"(params.start_date)
                                   , "timestamp"(params.end_date)
                                   , interval '1' DAY) AS t(period)),
              matrix as (SELECT p.period_date,
                                e.entity_id,
                                params.entity_type as entity_type
                         FROM params,
                              periods p
                                  CROSS JOIN
                              unnest(params.entity_ids) as e(entity_id)),
              start_info
                  as (select date_trunc(params.groupBy, params.start_date)::date                    period_date, eh.entity_id,
                             sum(case eh.action when 'JOIN' then 1 when 'LEAVE' then -1 else 0 end) member_count
                      from params,
                           employee_history eh
                      where eh.created_at:: date < params.start_date
             and eh.entity_type = upper (params.entity_type)::employee_history_entity_type_enum
             and eh.entity_id = ANY (params.entity_ids)
         group by params.groupBy,
             params.start_date,
             eh.entity_id),
             history as (
         select date_trunc(params.groupBy, eh.created_at):: date period_date,
             eh.entity_id,
             case eh.action when 'JOIN' then 1 else 0 end join_count,
             case eh.action when 'LEAVE' then 1 else 0 end leave_count,
             case eh.action when 'JOIN' then 1 when 'LEAVE' then -1 else 0 end member_count
         from params,
             employee_history eh
         where eh.created_at:: date between params.start_date
           and params.end_date
           and eh.entity_type = upper (params.entity_type)::employee_history_entity_type_enum
           and eh.entity_id = ANY (params.entity_ids)
         union all
         select si.period_date,
             si.entity_id,
             0 join_count,
             0 leave_count,
             si.member_count
         from start_info si),
             matrix_filled as
             (
         select distinct m.period_date,
             m.entity_id,
             m.entity_type,
             sum (coalesce (member_count, 0))
             over (partition by m.entity_id order by m.period_date) as members,
             sum (coalesce (join_count, 0))
             over (partition by m.entity_id, m.period_date) as subscribe,
             sum (coalesce (join_count, 0))
             over (partition by m.entity_id order by m.period_date) as comulative_subscribe,
             sum (coalesce (leave_count, 0)) over (partition by m.entity_id, m.period_date) as leave,
             sum (coalesce (leave_count, 0))
             over (partition by m.entity_id order by m.period_date) as comulative_leave
         from matrix m
             left join history h
         on (m.period_date = h.period_date
             and m.entity_id = h.entity_id)),
             total_info as (
         select mf.entity_id,
             mf.entity_type,
             coalesce (si.member_count, 0) as start_members,
             mf.members as end_members,
             mf.comulative_leave as leave,
             mf.comulative_subscribe as subscribe
         from params,
             matrix_filled mf
             left join start_info si
         on (mf.entity_id = si.entity_id)
         where mf.period_date = date_trunc(params.groupBy
             , params.end_date):: date)
             , total_info_json as (
         select json_build_object('groupBy', params.groupBy,
             'period',
             json_build_object('from', params.start_date, 'to', params.end_date),
             'entities',
             json_agg(json_build_object('entityId',
             ti.entity_id,
             'entityType',
             ti.entity_type,
             'startMembers',
             ti.start_members,
             'endMembers',
             ti.end_members,
             'subscribe',
             ti.subscribe,
             'leave',
             ti.leave
             ) order by ti.entity_id)) metadata
         from params,
             total_info ti
         group by params.groupBy,
             params.start_date,
             params.end_date),
             period_info as (
         select mf.period_date,
             json_build_object('period', mf.period_date, 'entities',
             json_agg(json_build_object('entityId', mf.entity_id,
             'entityType', mf.entity_type,
             'members', mf.members,
             'subscribe', mf.subscribe,
             'leave', mf.leave)
             order by mf.entity_id)) period_data
         from matrix_filled mf
         group by mf.period_date
         order by mf.period_date)
        select json_build_object('data', json_agg(pi.period_data order by period_date),
                                 'metadata', (select tij.metadata from total_info_json tij))
        from period_info pi
        `,
    [entityType, entityIds, groupBy, from, to],
  );
};

export { getReportBy };
