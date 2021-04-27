import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import Checkbox from '@beans/checkbox';

import { Decrease, Increase } from 'features/Common';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<any>;
  onChange: (id: string, checked: boolean) => void;
};
const Statistics = ({ data, onChange }: Props) => {
  const handleChangeItem = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.id, e.target.checked);
  return (
    <Table>
      <tbody>
        {data.map((item) => (
          <Row key={item.id}>
            <Cell>
              <Checkbox
                checked={item.checked}
                id={item.id}
                onChange={handleChangeItem}
              />
            </Cell>
            <Cell>
              <Name color={item.color}>{item.name}</Name>
            </Cell>
            <Cell>{item.members}</Cell>
            <Cell>
              <Increase final={item.members} increase={item.subscribe} />{' '}
              {item.subscribe}
            </Cell>
            <Cell>
              <Decrease final={item.members} decrease={item.leave} />{' '}
              {item.leave}
            </Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  border-spacing: 16px;
  border-collapse: separate;
`;
const Row = styled.tr`
  vertical-align: middle;
`;

const Cell = styled.td`
  vertical-align: middle;
`;

const Name = styled.div<{ color: string }>`
  color: ${({ color }) => color};
`;

export default Statistics;
