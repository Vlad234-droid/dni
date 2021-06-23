import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import Checkbox from '@beans/checkbox';

import { TextWithEllipsis } from 'features/Common';

import * as T from '../../../config/types';

const Entity = {
  [T.Entity.NETWORK]: {
    name: 'Networks',
    members: 'subscribers',
  },
  [T.Entity.EVENT]: {
    name: 'Events',
    members: 'participants',
  },
};

type Props = {
  data: Array<any>;
  onChange: (id: string, checked: boolean) => void;
  entityType: T.Entity;
};

const Statistics = ({ data, onChange, entityType }: Props) => {
  const handleChangeItem = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.id, e.target.checked);

  return (
    <Table>
      <tbody>
        <Row>
          <CellName>{Entity[entityType].name}</CellName>
          <Cell>{`${Entity[entityType].members} at the period start`}</Cell>
          <Cell>{`${Entity[entityType].members} at the period end`}</Cell>
          <Cell>{'change in %'}</Cell>
          <Cell>{'subscribed during the period'}</Cell>
          <Cell>{'left during the period'}</Cell>
        </Row>
        {data.map((item) => (
          <Row key={item.entityId}>
            <CellName color={item.color}>
              <Checkbox checked={item.checked} id={item.entityId} onChange={handleChangeItem} />
              <TextWithEllipsis>{item.name}</TextWithEllipsis>
            </CellName>
            <Cell>{item.startMembers}</Cell>
            <Cell>{item.endMembers}</Cell>
            <Cell>{item.percentages}</Cell>
            <Cell>{item.subscribe}</Cell>
            <Cell>{item.leave}</Cell>
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
