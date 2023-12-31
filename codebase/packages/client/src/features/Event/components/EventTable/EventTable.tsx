import React, { FC, useMemo, useState } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { css } from 'styled-components';
import isEmpty from 'lodash.isempty';

import { Table, Body, Cell, Row } from 'features/Table';
import { useMedia } from 'context/InterfaceContext';
import useStore from 'hooks/useStore';
import { EmptyContainer, Spinner, Error, TextWithEllipsis } from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';
import { DEFAULT_PAGINATION } from 'config/constants';
import { Network } from '@dni-connectors/colleague-cms-api';

import useFetchEvents from '../../hooks/useFetchEvents';
import { getPayloadWhere } from '../../utils';
import { Wrapper, Title, ButtonWrapper, ImageWrapper, NetworkWrapper } from './styled';

const TEST_ID = 'events-table';

const EventTable: FC = () => {
  const { isMobile, isLargeMobile } = useMedia();
  const isMobileView = isMobile || isLargeMobile;
  const { networks } = useStore((state) => state.auth.user);
  const { eventError } = useStore((state) => state.auth);
  const [page, setPage] = useState<number>(0);
  const { participants } = useStore((state) => state.events);
  const filters = {
    ...getPayloadWhere(networks),
    _sort: 'startDate:DESC',
    ...DEFAULT_PAGINATION,
    endDate_lt: new Date(),
  };
  const [loading, events, hasMore, listError, countError] = useFetchEvents(filters, page);
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);
  const error = useMemo(
    () => listError || countError || participants.error || eventError,
    [participants, listError, countError, eventError],
  );
  const tooltipPosition = { top: '38px', left: '32px' };

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: error }} />;

    if (isEmpty(events) && isLoading) return <Spinner height='500px' />;

    if (loading === Loading.SUCCEEDED && isEmpty(events)) {
      return <EmptyContainer description='Nothing to show' />;
    }

    const singleNetwork = (n: Network | Network[]): Network => {
      if (Array.isArray(n) && n.length > 0) {
        return n[0] as Network;
      } else {
        return n as Network;
      }
    };

    const renderNetwork = (network: Network, eventId: number) => {
      return (
        <NetworkWrapper>
          {network.image && (
            <ImageWrapper>
              <img src={network.image!.url} />
            </ImageWrapper>
          )}
          <TextWithEllipsis height='30px' href={`${Page.EVENTS}/${eventId}`} tooltipPosition={tooltipPosition}>
            {network.title}
          </TextWithEllipsis>
        </NetworkWrapper>
      );
    };

    return (
      <>
        <Table styles={styles}>
          <Body zebraStripes={isMobileView}>
            {events.map(({ id, title, endDate, network }) => (
              <Row key={id}>
                <Cell width='30%'>
                  <TextWithEllipsis height='30px' href={`${Page.EVENTS}/${id}`} tooltipPosition={tooltipPosition}>
                    {title}
                  </TextWithEllipsis>
                </Cell>
                <Cell width='30%' visible={!isMobileView}>
                  {endDate}
                </Cell>
                <Cell width={isMobileView ? '25%' : '15%'}>{participants.data[id]! || 0} members</Cell>
                <Cell width='25%' visible={!isMobileView}>
                  {network && renderNetwork(singleNetwork(network), id)}
                </Cell>
              </Row>
            ))}
          </Body>
        </Table>
        {!isEmpty(events) && isLoading && <Spinner />}
        {!isEmpty(events) && hasMore && (
          <ButtonWrapper>
            <Button disabled={isLoading} variant='secondary' onClick={() => setPage(page + 1)}>
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
