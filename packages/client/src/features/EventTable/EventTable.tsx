import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { css } from 'styled-components';
import { TitleWithEllipsis } from '@beans/title-link';

import { Table, Body, Cell, Row } from 'features/Table';
import { Wrapper } from './styled';
import Heading, { Size, Color } from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';

// TODO: remove in the feature
import { events } from 'features/Page/components/Events/data';

const EventList: FC = () => {
  const { isMobile } = useMedia();

  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        Past Events
      </Heading>
      <Table styles={styles}>
        <Body zebraStripes={isMobile}>
          {events.map(({ id, title, members, createdAt }) => (
            <Row key={id}>
              <Cell width='25%'>
                <TitleWithEllipsis maxLines={1} titleHeight='22px'>
                  {title}
                </TitleWithEllipsis>
              </Cell>
              <Cell width='40%' visible={!isMobile}>
                {createdAt}
              </Cell>
              <Cell width={isMobile ? '25%' : '15%'}>{members} members</Cell>
            </Row>
          ))}
        </Body>
      </Table>
      <Button variant='secondary'>
        More Past Events
        <Icon graphic='expand' size='xx' />
      </Button>
    </Wrapper>
  );
};

const styles = css`
  margin-bottom: 24px;
`;

export default EventList;
