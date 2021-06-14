import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownGroup from '@beans/dropdown-group';
import pick from 'lodash.pick';
import styled from 'styled-components';

import Chart from 'features/Chart';
import Diagram from 'features/Diagram';
import { ToastSkin, toasterActions } from 'features/Toaster';
import { getList as getNetworks } from 'features/Network';
import { getList as getEvents } from 'features/Event';
import store from 'store';

import RangeDateTimePicker from '../components/RangeDateTimePicker';
import { DropdownWrapper } from './styled';
import { actions, getReports } from '../store';
import * as T from '../config/types';

const RangeWrapper = styled.div`
  padding: 0 8px;
`;

const Label = styled.div`
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 12px;
  min-width: 216px;
`;

const label = {
  [T.PERIOD]: {
    [T.Entity.NETWORK]: 'Network subscribers over time',
    [T.Entity.EVENT]: 'Event participants over time',
  },
  [T.REGION]: {
    [T.Entity.NETWORK]: 'Network subscribers over regions',
    [T.Entity.EVENT]: 'Event participants over regions',
  },
  [T.FORMAT]: {
    [T.Entity.NETWORK]: 'Network subscribers over formats',
    [T.Entity.EVENT]: 'Event participants over formats',
  },
};

const periodButtons = [
  {
    key: T.Period.THIS_YEAR,
    title: 'This year',
  },
  {
    key: T.Period.LAST_MONTH,
    title: 'Last month',
  },
  {
    key: T.Period.LAST_WEEK,
    title: 'Last week',
  },
  {
    key: T.Period.PICK_PERIOD,
    title: 'Pick period',
  },
];

const getEntities = {
  0: getNetworks,
  1: getEvents,
};

type Props = {
  entityType: T.Entity;
  filter: T.Filter;
  filterFilter: T.Period;
  dateInterval: T.Interval;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const Graphics: FC<Props> = ({ entityType, filter, filterFilter, dateInterval, data }) => {
  const dispatch = useDispatch();

  const { ids } = useSelector(() => store.getState()[entityType === 0 ? 'networks' : 'events']);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePeriodButtonClick = (event: any) => {
    event.preventDefault();

    dispatch(actions.setTimePeriodFilter({ period: event.target.value }));
  };

  const handlePeriodEffect = () => {
    if (ids.length === 0) {
      dispatch(
        getEntities[entityType]({
          _start: 0,
          _limit: 100,
        }),
      );

      return;
    }

    if ([T.Period.THIS_YEAR, T.Period.LAST_MONTH, T.Period.LAST_WEEK].includes(filterFilter)) {
      dispatch(
        getReports({
          entityType,
          filter,
          filterFilter,
          ids,
        }),
      );
    }
  };

  const handleRangeChange = ({ value, prop }: { value: T.DatePoint; prop: string }) => {
    dispatch(actions.updatePeriodInterval({ entityType, value, prop }));

    let dateFrom = new Date();
    let dateTo = new Date();

    let { from, to } = store.getState().reports[entityType][T.PERIOD][T.Period.PICK_PERIOD].dateInterval;

    switch (prop) {
      case 'from':
        from = value;
        dateFrom = new Date(`${value.mm} ${value.dd} ${value.yyyy}`);
        dateTo = new Date(`${to.mm} ${to.dd} ${to.yyyy}`);
        break;
      case 'to':
        to = value;
        dateFrom = new Date(`${from.mm} ${from.dd} ${from.yyyy}`);
        dateTo = new Date(`${value.mm} ${value.dd} ${value.yyyy}`);
        break;
    }

    const dateFromInMs = dateFrom.getTime();
    const dateToInMs = dateTo.getTime();

    if ([dateFromInMs, dateToInMs].includes(NaN)) {
      return;
    }

    if (dateFromInMs >= dateToInMs) {
      dispatch(
        toasterActions.createToast({
          id: 'wrong-interval',
          skin: ToastSkin.WRONG_INTERVAL,
        }),
      );

      return;
    }

    if (to.dd > from.dd && to.mm >= from.mm && to.yyyy > from.yyyy) {
      dispatch(
        toasterActions.createToast({
          id: 'interval-limit',
          skin: ToastSkin.INTERVAL_LIMIT,
        }),
      );

      return;
    }

    dispatch(
      getReports({
        entityType,
        filter,
        filterFilter,
        from: dateFrom.toISOString(),
        to: dateTo.toISOString(),
      }),
    );
  };

  useEffect(handlePeriodEffect, [entityType, ids, filterFilter]);

  switch (filter) {
    case T.PERIOD:
      return (
        <div data-testid={T.PERIOD}>
          <DropdownWrapper>
            <Label>{label[filter][entityType]}</Label>
            {filterFilter === T.Period.PICK_PERIOD && (
              <RangeWrapper>
                <RangeDateTimePicker
                  from={dateInterval.from}
                  to={dateInterval.to}
                  handleRangeChange={handleRangeChange}
                />
              </RangeWrapper>
            )}
            <DropdownGroup
              required
              id='graphics'
              value={filterFilter}
              labelText='Time Period'
              onChange={handlePeriodButtonClick}
              style={{
                width: 208,
              }}
            >
              {periodButtons.map(({ title, key }) => (
                <option key={key} value={title}>
                  {title}
                </option>
              ))}
            </DropdownGroup>
          </DropdownWrapper>
          <Chart type={'entities'} data={pick(data, ['elements', 'entities'])} />
        </div>
      );
    case T.REGION:
      return (
        <div data-testid={T.REGION}>
          <Label>{label[filter][entityType]}</Label>
          <Diagram type={'regions'} data={pick(data, ['elements', 'regions'])} />
        </div>
      );
    case T.FORMAT:
      return (
        <div data-testid={T.FORMAT}>
          <Label>{label[filter][entityType]}</Label>
          <Diagram type={'formats'} data={pick(data, ['elements', 'formats'])} />
        </div>
      );
    default:
      return null;
  }
};

export default Graphics;
