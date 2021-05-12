import React, { FC, useState } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { css } from 'styled-components';
import { TitleWithEllipsis } from '@beans/title-link';
import isEmpty from 'lodash.isempty';

import { Table, Body, Cell, Row } from 'features/Table';
import Heading, { Size, Color } from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import useStore from 'hooks/useStore';
import { EmptyContainer, Spinner } from 'features/Common';
import { Page } from 'features/Page';

import useFetchEvents from '../../hooks/useFetchEvents';
import { Wrapper } from './styled';

const EventTable: FC = () => {
  const { isMobile } = useMedia();
  const { networks = [] } = useStore((state) => state.auth.user);
  const [page, setPage] = useState<number>(0);
  const filters = {
    endDate_lt: new Date(),
    network_in: [...networks, -1],
  };
  const { participants } = useStore((state) => state.events);
  const [isLoading, list, hasMore] = useFetchEvents(filters, page, true);

  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        Past Events
      </Heading>
      {isEmpty(list) ? (
        <EmptyContainer description='You have no past events' />
      ) : (
        <>
          <Table styles={styles}>
            <Body zebraStripes={isMobile}>
              {list.map(({ id, title, endDate }) => (
                <Row key={id}>
                  <Cell width='25%'>
                    <TitleWithEllipsis
                      maxLines={1}
                      titleHeight='22px'
                      href={`${Page.EVENTS}/${id}`}
                    >
                      {title}
                    </TitleWithEllipsis>
                  </Cell>
                  <Cell width='40%' visible={!isMobile}>
                    {endDate}
                  </Cell>
                  <Cell width={isMobile ? '25%' : '15%'}>
                    {participants[id]! || 0} members
                  </Cell>
                </Row>
              ))}
            </Body>
          </Table>
          {isLoading && <Spinner />}
          <Button
            disabled={!hasMore || isLoading}
            variant='secondary'
            onClick={() => setPage(page + 1)}
          >
            More Past Events
            <Icon graphic='expand' size='xx' />
          </Button>
        </>
      )}
    </Wrapper>
  );
};

const styles = css`
  margin-bottom: 24px;
`;

export default EventTable;
