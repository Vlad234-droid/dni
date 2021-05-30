import React, { FC, useMemo, useState } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { css } from 'styled-components';
import isEmpty from 'lodash.isempty';

import { Table, Body, Cell, Row } from 'features/Table';
import { useMedia } from 'context/InterfaceContext';
import useStore from 'hooks/useStore';
import {
  EmptyContainer,
  Spinner,
  Error,
  TitleWithEllipsis,
} from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';
import { DEFAULT_FILTERS } from 'config/constants';

import useFetchEvents from '../../hooks/useFetchEvents';
import { getPayloadWhere } from '../../utils';
import {
  Wrapper,
  Title,
  ButtonWrapper,
  ImageWrapper,
  NetworkWrapper,
} from './styled';

const TEST_ID = 'events-table';

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
  const [loading, events, hasMore, listError, countError] = useFetchEvents(
    filters,
    page,
  );
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );
  const error = useMemo(() => listError || countError || participants.error, [
    participants,
    listError,
    countError,
  ]);

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: error }} />;

    if (isEmpty(events) && isLoading) return <Spinner height='500px' />;

    if (loading === Loading.SUCCEEDED && isEmpty(events)) {
      return <EmptyContainer description='You have no past events' />;
    }

    return (
      <>
        <Table styles={styles}>
          <Body zebraStripes={isMobile}>
            {events.map(({ id, title, endDate, network }) => (
              <Row key={id}>
                <Cell width='30%'>
                  <TitleWithEllipsis
                    titleHeight='30px'
                    href={`${Page.EVENTS}/${id}`}
                  >
                    {title}
                  </TitleWithEllipsis>
                </Cell>
                <Cell width='30%' visible={!isMobile}>
                  {endDate}
                </Cell>
                <Cell width={isMobile ? '25%' : '15%'}>
                  {participants.data[id]! || 0} members
                </Cell>
                <Cell width='25%' visible={!isMobile}>
                  {network && (
                    <NetworkWrapper>
                      {network.image && (
                        <ImageWrapper>
                          <img src={network.image!.url} />
                        </ImageWrapper>
                      )}
                      <TitleWithEllipsis
                        titleHeight='30px'
                        href={`${Page.EVENTS}/${id}`}
                      >
                        {network.title}
                      </TitleWithEllipsis>
                    </NetworkWrapper>
                  )}
                </Cell>
              </Row>
            ))}
          </Body>
        </Table>
        {!isEmpty(events) && isLoading && <Spinner />}
        {!isEmpty(events) && hasMore && (
          <ButtonWrapper>
            <Button
              disabled={isLoading}
              variant='secondary'
              onClick={() => setPage(page + 1)}
            >
              More Past Events
              <Icon graphic='expand' size='xx' />
            </Button>
          </ButtonWrapper>
        )}
      </>
    );
  }, [error, events, loading, participants, page]);

  return (
    <Wrapper data-testid={TEST_ID}>
      <Title>Past Events</Title>
      {memoizedContent}
    </Wrapper>
  );
};

const styles = css`
  margin-bottom: 24px;
`;

export default EventTable;
