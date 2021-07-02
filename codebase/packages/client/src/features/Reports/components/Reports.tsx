import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Statistics from '../components/Statistics';
import ButtonFilter from '../components/ButtonFilter';
import Graphics from './Graphics';
import store from 'store';
import { Wrapper } from './styled';

import { actions } from '../store';
import * as T from '../config/types';

const filterButtons = [
  {
    key: T.PERIOD,
    title: 'Time period',
  },
  {
    key: T.REGION,
    title: 'Region',
  },
  {
    key: T.FORMAT,
    title: 'Format',
  },
];

const entityButtons = [
  {
    key: T.Entity.network,
    title: 'Network',
  },
  {
    key: T.Entity.event,
    title: 'Event',
  },
];

export const REPORT_TEST_ID = 'report-component';

const Reports: FC = () => {
  const dispatch = useDispatch();

  const { entityType } = useSelector(() => store.getState().reports);

  const { filter } = useSelector(() => store.getState().reports[entityType]);

  const filterFilter = useSelector(() => store.getState().reports[entityType][filter].filter);

  const { chart, statistics, dateInterval } = useSelector(
    () => store.getState().reports[entityType][filter][filterFilter],
  );

  const handleUpdateStatistics = (id: string, checked: boolean) => {
    dispatch(
      actions.updateStatistics({
        entityType,
        filter,
        filterFilter,
        checked,
        id,
      }),
    );
  };

  return (
    <Wrapper data-testid={REPORT_TEST_ID}>
      <ButtonFilter
        value={filter}
        initialFilters={filterButtons}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => dispatch(actions.setFilter({ key: event.target.value }))}
        name='filters'
      />
      <Graphics
        entityType={entityType}
        filter={filter}
        filterFilter={filterFilter}
        dateInterval={dateInterval}
        data={chart}
      />
      <ButtonFilter
        value={entityType}
        initialFilters={entityButtons}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any) => dispatch(actions.setEntityType({ entityType: event.target.value }))}
        name='entities'
      />
      <Statistics entityType={entityType} data={statistics} onChange={handleUpdateStatistics} filter={filter} />
    </Wrapper>
  );
};

export default Reports;
