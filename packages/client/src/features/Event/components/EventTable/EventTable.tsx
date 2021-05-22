import React, { FC, useMemo, useState } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { css } from 'styled-components';
import isEmpty from 'lodash.isempty';

import { Table, Body, Cell, Row } from 'features/Table';
import Heading, { Size, Color } from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import useStore from 'hooks/useStore';
import { EmptyContainer, Spinner, TitleWithEllipsis } from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';
import { DEFAULT_FILTERS } from 'config/constants';

import useFetchEvents from '../../hooks/useFetchEvents';
import { getPayloadWhere } from '../../utils';
import { Wrapper } from './styled';

const EventTable: FC = () => {
  const { isMobile } = useMedia();
  const { networks } = useStore((state) => state.auth.user);
  const [page, setPage] = useState<number>(0);
  const { participants } = useStore((state) => state.events);
  const filters = {
    ...getPayloadWhere(networks),
    ...DEFAULT_FILTERS,
    endDate_lt: new Date(),
  };
  const [loading, events, hasMore] = useFetchEvents(filters, page);
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );

  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        Past Events
      </Heading>
      {isEmpty(events) && isLoading && <Spinner height='500px' />}
      {loading === Loading.SUCCEEDED && isEmpty(events) ? (
        <EmptyContainer description='You have no Past Events' />
      ) : (
        <>
          <Table styles={styles}>
            <Body zebraStripes={isMobile}>
              {events.map(({ id, title, endDate }) => (
                <Row key={id}>
                  <Cell width='25%'>
                    <TitleWithEllipsis
                      href={`${Page.EVENTS}/${id}`}
                      titleHeight='30px'
                    >
                      {title}
                    </TitleWithEllipsis>
                  </Cell>
                  <Cell width='40%' visible={!isMobile}>
                    {endDate}
                  </Cell>
                  <Cell width={isMobile ? '25%' : '15%'}>
                    {participants.data[id]! || 0} members
                  </Cell>
                </Row>
              ))}
            </Body>
          </Table>
          {!isEmpty(events) && isLoading && <Spinner />}
          {!isEmpty(events) && (
            <Button
              disabled={!hasMore || isLoading}
              variant='secondary'
              onClick={() => setPage(page + 1)}
            >
              More Past Events
              <Icon graphic='expand' size='xx' />
            </Button>
          )}
        </>
      )}
    </Wrapper>
  );
};

const styles = css`
  margin-bottom: 24px;
`;

export default EventTable;
