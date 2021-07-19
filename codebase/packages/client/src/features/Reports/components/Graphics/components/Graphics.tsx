import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import DropdownGroup from '@beans/dropdown-group';
import styled from 'styled-components';

import { ToastSkin, toasterActions } from 'features/Toaster';
import store from 'store';

import { toDateInterval } from '../../../utils';
import AreaChart from '../../AreaChart';
import BarChart from '../../BarChart';
import RangeDateTimePicker from '../../RangeDateTimePicker';
import DateTimePicker, { Type } from '../../DateTimePicker';
import { DropdownWrapper } from './styled';
import * as T from '../../../config/types';
import { actions, getReportsByTime, getReportsByRegion, getReportsByFormat } from '../../../store';
import { now } from 'utils/date';

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
  [T.ReportType.PERIOD]: {
    [T.EntityType.NETWORK]: 'Network subscribers over time',
    [T.EntityType.EVENT]: 'Event participants over time',
  },
  [T.ReportType.REGION]: {
    [T.EntityType.NETWORK]: 'Network subscribers over regions',
    [T.EntityType.EVENT]: 'Event participants over regions',
  },
  [T.ReportType.FORMAT]: {
    [T.EntityType.NETWORK]: 'Network subscribers over formats',
    [T.EntityType.EVENT]: 'Event participants over formats',
  },
};

const periodButtons = [
  {
    key: T.PeriodType.THIS_YEAR,
    title: 'This year',
  },
  {
    key: T.PeriodType.LAST_MONTH,
    title: 'Last month',
  },
  {
    key: T.PeriodType.LAST_WEEK,
    title: 'Last week',
  },
  {
    key: T.PeriodType.PICK_PERIOD,
    title: 'Pick period',
  },
];

type Props = {
  reportType: T.ReportType;
  entityType: T.EntityType;
  periodType: T.PeriodType;
  dateInterval: T.Interval;
  data: any;
};

const Graphics: FC<Props> = ({ reportType, entityType, periodType, dateInterval, data }) => {
  const dispatch = useDispatch();

  const handlePeriodPick = (event: any) => {
    event.preventDefault();

    dispatch(actions.setPeriodType({ key: event.target.value }));
  };

  const handleEndChange = (value: T.DatePoint) => {
    dispatch(actions.updatePeriodInterval({ reportType, entityType, value, prop: T.Prop.TO }));

    const dateTo = new Date(`${value.mm} ${value.dd} ${value.yyyy}`).toISOString();

    switch (reportType) {
      case T.ReportType.REGION: {
        dispatch(
          getReportsByRegion({
            entityType,
            to: dateTo,
          }),
        );
        break;
      }
      case T.ReportType.FORMAT: {
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

  const handleRangeChange = ({ value, prop }: { value: T.DatePoint; prop: T.Prop }) => {
    dispatch(actions.updatePeriodInterval({ reportType, entityType, value, prop }));

    let dateFrom = new Date();
    let dateTo = new Date();

    let { from, to } = store.getState().reports.groups[T.ReportType.PERIOD].dateInterval;

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

    const { ids } = store.getState().reports[entityType];

    dispatch(
      getReportsByTime({
        reportType,
        entityType,
        periodType,
        from: dateFrom.toISOString(),
        to: dateTo.toISOString(),
        ids,
      }),
    );
  };

  const memoizedDatePicker = useMemo(
    () => (
      <DateTimePicker
        key={reportType}
        label='Select date'
        dateTime={dateInterval.to.dd === '' ? toDateInterval(now().toISOString()) : dateInterval.to}
        required
        type={Type.TYPE_END}
        handleDateChange={handleEndChange}
      />
    ),
    [dateInterval.to],
  );

  switch (reportType) {
    case T.ReportType.PERIOD:
      return (
        <div data-testid={T.ReportType.PERIOD}>
          <DropdownWrapper>
            <Label>{label[reportType][entityType]}</Label>
            {periodType === T.PeriodType.PICK_PERIOD && (
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
              value={periodType}
              labelText='Time interval'
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
    case T.ReportType.REGION:
      return (
        <div data-testid={T.ReportType.REGION}>
          <DropdownWrapper>
            <Label>{label[reportType][entityType]}</Label>
            <RangeWrapper>{memoizedDatePicker}</RangeWrapper>
          </DropdownWrapper>
          <BarChart data={data} key={reportType} />
        </div>
      );
    case T.ReportType.FORMAT:
      return (
        <div data-testid={T.ReportType.FORMAT}>
          <DropdownWrapper>
            <Label>{label[reportType][entityType]}</Label>
            <RangeWrapper>{memoizedDatePicker}</RangeWrapper>
          </DropdownWrapper>
          <BarChart data={data} key={reportType} />
        </div>
      );
    default:
      return null;
  }
};

export default Graphics;
