import React, { FC, useState, useEffect, RefObject } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@beans/button';
import Icon from '@beans/icon';
import Html2Canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import store from 'store';
import { now } from 'utils/date';

import Statistics from '../../Statistics';
import ButtonFilter from '../../ButtonFilter';
import Graphics from '../../Graphics';
import { Wrapper } from './styled';
import {
  actions,
  getReportsByTime,
  getReportsByRegion,
  getReportsByFormat,
  getNetworks,
  getEvents,
} from '../../../store';
import * as T from '../../../config/types';

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
    title: 'Business area',
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

const getEntities = {
  1: getEvents,
  0: getNetworks,
};

export const REPORT_TEST_ID = 'reports';

const Reports: FC = () => {
  const dispatch = useDispatch();

  const { entityType } = useSelector(() => store.getState().reports);

  const { filter } = useSelector(() => store.getState().reports[entityType]);

  const filterFilter = useSelector(() => store.getState().reports[entityType][filter].filter);

  const { ids } = useSelector(() => store.getState().reports[entityType === 0 ? 'networks' : 'events']);

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

  const [isPDFLoading, setPDFLoading] = useState(false);
  const ref = React.createRef() as RefObject<HTMLDivElement>;

  const handlePDFDownloadClick = () => {
    setPDFLoading(true);
  };

  useEffect(() => {
    if (!isPDFLoading) {
      return;
    }

    const input = ref.current as HTMLElement;

    const paddingX = 130;
    const paddingY = 130;
    const offsetX = 120;
    const offsetY = 270;

    Html2Canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        format: [input.clientWidth + paddingX * 2 + offsetX, input.clientHeight + paddingY * 2 + offsetY],
        unit: 'px',
      }) as any;

      pdf.addImage(imgData, 'JPEG', paddingX, paddingY);

      pdf.save('network-members-report.pdf');

      setPDFLoading(false);
    });
  }, [isPDFLoading]);

  const handleReportsEffect = () => {
    if (ids.length === 0) {
      dispatch(
        getEntities[entityType]({
          _start: 0,
          _limit: 1000,
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
          ids,
        }),
      );

      return;
    }

    let dateTo;

    if (dateInterval.to.dd === '') {
      dateTo = now().toISOString();
    } else {
      const { to } = dateInterval;
      dateTo = new Date(`${to.mm} ${to.dd} ${to.yyyy}`).toISOString();
    }

    if (filter === T.REGION) {
      dispatch(
        getReportsByRegion({
          entityType,
          ids,
          to: dateTo,
        }),
      );

      return;
    }

    if (filter === T.FORMAT) {
      dispatch(
        getReportsByFormat({
          entityType,
          ids,
          to: dateTo,
        }),
      );

      return;
    }
  };

  useEffect(handleReportsEffect, [ids, entityType, filter, filterFilter]);

  return (
    <Wrapper data-testid={REPORT_TEST_ID}>
      <Buttons>
        <ButtonFilter
          value={filter}
          initialFilters={filterButtons}
          onChange={(event: any) => dispatch(actions.setFilter({ key: event.target.value }))}
          name='filters'
        />
        <ButtonLoader>
          <Icon graphic='download' onClick={handlePDFDownloadClick} />
        </ButtonLoader>
      </Buttons>
      <div ref={ref}>
        <Graphics
          entityType={entityType}
          filter={filter}
          filterFilter={filterFilter}
          dateInterval={dateInterval}
          data={chart}
        />
        <div
          style={{
            visibility: isPDFLoading ? 'hidden' : 'visible',
          }}
        >
          <ButtonFilter
            value={entityType}
            initialFilters={entityButtons}
            onChange={(event: any) => dispatch(actions.setEntityType({ entityType: event.target.value }))}
            name='entities'
          />
        </div>
        <Statistics entityType={entityType} filter={filter} data={statistics} onChange={handleUpdateStatistics} />
      </div>
    </Wrapper>
  );
};

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonLoader = styled(Button)``;

export default Reports;
