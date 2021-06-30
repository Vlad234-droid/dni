import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownGroup from '@beans/dropdown-group';
import styled from 'styled-components';

import { ToastSkin, toasterActions } from 'features/Toaster';
import { getList as getNetworks } from 'features/Network';
import { getList as getEvents } from 'features/Event';
import store from 'store';

import AreaChart from '../components/AreaChart';
import BarChart from '../components/BarChart';
import RangeDateTimePicker from '../components/RangeDateTimePicker';
import DateTimePicker, { Type } from '../components/DateTimePicker';
import { DropdownWrapper } from './styled';
import { actions, getReportsByTime, getReportsByRegion, getReportsByFormat } from '../store';
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
    [T.Entity.network]: 'Network subscribers over time',
    [T.Entity.event]: 'Event participants over time',
  },
  [T.REGION]: {
    [T.Entity.network]: 'Network subscribers over regions',
    [T.Entity.event]: 'Event participants over regions',
  },
  [T.FORMAT]: {
    [T.Entity.network]: 'Network subscribers over formats',
    [T.Entity.event]: 'Event participants over formats',
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
  filterFilter: T.FilterFilter;
  dateInterval: T.Interval;
  data: any;
};

const Graphics: FC<Props> = ({ entityType, filter, filterFilter, dateInterval, data }) => {
  const dispatch = useDispatch();

  const { ids } = useSelector(() => store.getState()[entityType === 0 ? 'networks' : 'events']);

  const handlePeriodPick = (event: any) => {
    event.preventDefault();

    dispatch(actions.setTimePeriodFilter({ period: event.target.value }));
  };

  const handleEndChange = (value: T.DatePoint) => {
    dispatch(actions.updatePeriodInterval({ filter, entityType, value, prop: 'to' }));

    const dateTo = new Date(`${value.mm} ${value.dd} ${value.yyyy}`).toISOString();

    switch (filter) {
      case T.REGION: {
        dispatch(
          getReportsByRegion({
            entityType,
            to: dateTo,
          }),
        );
        break;
      }
      case T.FORMAT: {
        dispatch(
          getReportsByFormat({
            entityType,
            to: dateTo,
          }),
        );
        break;
      }
    }
  };

  const handleRangeChange = ({ value, prop }: { value: T.DatePoint; prop: string }) => {
    dispatch(actions.updatePeriodInterval({ filter, entityType, value, prop }));

    let dateFrom = new Date();
    let dateTo = new Date();

    let { from, to } = store.getState().reports[entityType][filter][T.Period.PICK_PERIOD].dateInterval;

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
      getReportsByTime({
        entityType,
        filter,
        filterFilter,
        from: dateFrom.toISOString(),
        to: dateTo.toISOString(),
      }),
    );
  };

  const handleGraphicsEffect = () => {
    if (ids.length === 0) {
      dispatch(
        getEntities[entityType]({
          _start: 0,
          _limit: 100,
        }),
      );

      return;
    }

    if (filter === T.PERIOD && filterFilter !== T.Period.PICK_PERIOD) {
      dispatch(
        getReportsByTime({
          entityType,
          filter,
          filterFilter,
        }),
      );
    }

    if (filter === T.REGION) {
      dispatch(
        getReportsByRegion({
          entityType,
        }),
      );
    }

    if (filter === T.FORMAT) {
      dispatch(
        getReportsByFormat({
          entityType,
        }),
      );
    }
  };

  useEffect(handleGraphicsEffect, [ids, entityType, filter, filterFilter]);

  const memoizedDatePicker = useMemo(
    () => (
      <DateTimePicker
        key={filter}
        label='Select date'
        dateTime={dateInterval.to}
        required
        type={Type.TYPE_END}
        handleDateChange={handleEndChange}
      />
    ),
    [dateInterval.to],
  );

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
              onChange={handlePeriodPick}
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
          <AreaChart data={data} />
        </div>
      );
    case T.REGION:
      return (
        <div data-testid={T.REGION}>
          <DropdownWrapper>
            <Label>{label[filter][entityType]}</Label>
            <RangeWrapper>{memoizedDatePicker}</RangeWrapper>
          </DropdownWrapper>
          <BarChart data={data} key={filter} />
        </div>
      );
    case T.FORMAT:
      return (
        <div data-testid={T.FORMAT}>
          <DropdownWrapper>
            <Label>{label[filter][entityType]}</Label>
            <RangeWrapper>{memoizedDatePicker}</RangeWrapper>
          </DropdownWrapper>
          <BarChart data={data} key={filter} />
        </div>
      );
    default:
      return null;
  }
};

export default Graphics;
