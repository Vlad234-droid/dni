import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
// import Checkbox from '@beans/checkbox';

import { TextWithEllipsis } from 'features/Common';

import * as T from '../../../config/types';
import Checkbox from '../../Checkbox';

const Entity = {
  [T.EntityType.NETWORK]: {
    name: 'Networks',
    members: 'subscribers',
  },
  [T.EntityType.EVENT]: {
    name: 'Events',
    members: 'participants',
  },
};

type DataType = T.StatisticsItemByPeriod | T.StatisticsItemByFormat | T.StatisticsItemByRegion;

interface Props {
  data: DataType[];
  onChange: (id: string, checked: boolean) => void;
  reportType: T.ReportType;
  entityType: T.EntityType;
}

const Statistics = ({ data, onChange, entityType, reportType }: Props) => {
  const handleChangeItem = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.id, e.target.checked);

  return (
    <Table>
      <tbody>
        <Row>
          <CellName>{Entity[entityType].name}</CellName>
          {reportType === T.ReportType.PERIOD && (
            <>
              <Cell>{`${Entity[entityType].members} at the period start`}</Cell>
              <Cell>{`${Entity[entityType].members} at the period end`}</Cell>
              <Cell>{'change in %'}</Cell>
              <Cell>{'subscribed during the period'}</Cell>
              <Cell>{'left during the period'}</Cell>
            </>
          )}
          {(reportType === T.ReportType.REGION || reportType === T.ReportType.FORMAT) && <Cell>{'Participants'}</Cell>}
        </Row>
        {data.map((item) => (
          <Row key={item.entityId}>
            <CellName color={item.color}>
              <Checkbox checked={item.checked} entityId={item.entityId} onChange={handleChangeItem} />
              <TextWithEllipsis>{item.name}</TextWithEllipsis>
            </CellName>
            {reportType === T.ReportType.PERIOD && (
              <>
                <Cell>{(item as T.StatisticsItemByPeriod).startSubscribers}</Cell>
                <Cell>{(item as T.StatisticsItemByPeriod).endSubscribers}</Cell>
                <Cell>{(item as T.StatisticsItemByPeriod).endSubscribers}</Cell>
                <Cell>{(item as T.StatisticsItemByPeriod).joined}</Cell>
                <Cell>{(item as T.StatisticsItemByPeriod).leaved}</Cell>
              </>
            )}
            {(reportType === T.ReportType.REGION || reportType === T.ReportType.FORMAT) && (
              <Cell>{item.participants}</Cell>
            )}
          </Row>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  padding: 30px 0;
  border-spacing: 16px;
  border-collapse: separate;
`;

const Row = styled.tr`
  vertical-align: middle;

  &:first-child {
    color: ${({ theme }) => theme.colors.grayscale};
  }
`;

const Cell = styled.td`
  vertical-align: top;

  &:first-child {
    display: flex;
    align-items: center;
  }

  &:not(:first-child) {
    text-align: right;
  }

  h5 {
    color: ${({ color }) => color};
    margin-left: 16px;
    margin-right: 0;
    font-weight: normal;
    max-width: 400px;
  }
`;

const CellName = styled(Cell)<{
  color?: string;
}>`
  min-width: 250px;
  max-width: 250px;
  color: ${({ color }) => color};

  & > *:first-child {
    flex-shrink: 0;
  }
`;

export default Statistics;
