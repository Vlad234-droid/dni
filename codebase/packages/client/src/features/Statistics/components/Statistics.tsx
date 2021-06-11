import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import Checkbox from '@beans/checkbox';

import { textSM } from 'styles';
import { Decrease, Increase, TextWithEllipsis } from 'features/Common';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<any>;
  onChange: (id: string, checked: boolean) => void;
};
const Statistics = ({ data, onChange }: Props) => {
  const handleChangeItem = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.id, e.target.checked);

  return (
    <Table>
      <tbody>
        <Row>
          <Cell>Networks</Cell>
          <Cell>Members</Cell>
          <Cell>Subscribe</Cell>
          <Cell>Leave</Cell>
        </Row>
        {data.map((item) => (
          <Row key={item.id}>
            <Cell>
              <Checkbox checked={item.checked} id={item.id} onChange={handleChangeItem} />
              <TextWithEllipsis maxWidth='400px'>{item.name}</TextWithEllipsis>
            </Cell>
            <Cell>{item.members}</Cell>
            <Cell>
              <Increase final={item.members} increase={item.subscribe} /> {item.subscribe}
            </Cell>
            <Cell>
              <Decrease final={item.members} decrease={item.leave} /> {item.leave}
            </Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  margin-top: 30px;
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
  &:first-child {
    display: flex;
    align-items: center;
  }

  &:not(:first-child) {
    text-align: right;
  }

  h5 {
    margin-left: 16px;
    color: ${({ theme }) => theme.colors.tescoBlue};
    ${textSM}
  }
`;

export default Statistics;
