import React, { FC, ChangeEvent, useState, useEffect, RefObject } from 'react';
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

const reportButtons = [
  {
    key: T.ReportType.PERIOD,
    title: 'Time period',
  },
  {
    key: T.ReportType.REGION,
    title: 'Region',
  },
  {
    key: T.ReportType.FORMAT,
    title: 'Business area',
  },
];

const entityButtons = [
  {
    key: T.EntityType.NETWORK,
    title: 'Network',
  },
  {
    key: T.EntityType.EVENT,
    title: 'Event',
  },
];

const getEntities = {
  [T.EntityType.EVENT]: getEvents,
  [T.EntityType.NETWORK]: getNetworks,
};

export const REPORT_TEST_ID = 'reports';

const Reports: FC = () => {
  const dispatch = useDispatch();

  const { reportType } = useSelector(() => store.getState().reports.filters);
  const { entityType } = useSelector(() => store.getState().reports.filters);
  const { periodType } = useSelector(() => store.getState().reports.filters);

  const { ids } = useSelector(() => store.getState().reports[entityType]);

  const { chart, statistics, dateInterval } = useSelector(() => store.getState().reports.groups[reportType]);

  const handleUpdateStatistics = (id: string, checked: boolean) => {
    dispatch(
      actions.updateStatistics({
        reportType,
        entityType,
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
    const k = window.devicePixelRatio > 1.5 ? 2 : 3;

    Html2Canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF({
        format: [input.clientWidth + paddingX * k, input.clientHeight + paddingY * k],
        unit: 'px',
      });

      pdf.addImage(imgData, 'JPEG', paddingX, paddingY, input.clientWidth, input.clientHeight);

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

    if (reportType === T.ReportType.PERIOD && periodType !== T.PeriodType.PICK_PERIOD) {
      dispatch(
        getReportsByTime({
          entityType,
          periodType,
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

    if (reportType === T.ReportType.REGION) {
      dispatch(
        getReportsByRegion({
          entityType,
          ids,
          to: dateTo,
        }),
      );

      return;
    }

    if (reportType === T.ReportType.FORMAT) {
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

  useEffect(handleReportsEffect, [ids, reportType, entityType, periodType]);

  return (
    <Wrapper data-testid={REPORT_TEST_ID}>
      <Buttons>
        <ButtonFilter
          value={reportType}
          initialFilters={reportButtons}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            dispatch(actions.setReportType({ key: event.target.value }))
          }
          name='filters'
        />
        <ButtonLoader>
          <Icon graphic='download' onClick={handlePDFDownloadClick} />
        </ButtonLoader>
      </Buttons>
      <div ref={ref}>
        <Graphics
          reportType={reportType}
          entityType={entityType}
          periodType={periodType}
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
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              dispatch(actions.setEntityType({ key: event.target.value }))
            }
            name='entities'
          />
        </div>
        <Statistics
          reportType={reportType}
          entityType={entityType}
          data={statistics}
          onChange={handleUpdateStatistics}
        />
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
