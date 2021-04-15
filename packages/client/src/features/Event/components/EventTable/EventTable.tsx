import React, { FC, useMemo, useCallback, useEffect, useState } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { css } from 'styled-components';
import { TitleWithEllipsis } from '@beans/title-link';

import { Table, Body, Cell, Row } from 'features/Table';
import { Wrapper } from './styled';
import Heading, { Size, Color } from 'features/Heading';
import { useMedia } from 'context/InterfaceContext';
import useFetch from 'hooks/useFetch';
import { DEFAULT_PAGINATION } from 'utils/storeHelper';
import { Event } from '../../store';
import { isoDateToFormat, FULL_FORMAT } from 'utils/date';

const EventList: FC = () => {
  const { isMobile } = useMedia();
  const [page, setPage] = useState<number>(0);
  const [list, setList] = useState<Event[]>([]);
  const filters = {
    _where: JSON.stringify([{ endDate_lt: new Date() }]),
  };

  const [
    { response: data, isLoading: isEventsLoading },
    doFetchEvents,
  ] = useFetch<Event[]>([]);
  const [
    { response: total, isLoading: isEventsCoutnLoading },
    doFetchEventsCount,
  ] = useFetch<number>(0);

  const isLoading = useMemo(() => isEventsLoading || isEventsCoutnLoading, [
    isEventsLoading,
    isEventsCoutnLoading,
  ]);

  const hasMore = useMemo(() => list!.length < total!, [list, total]);

  const loadEvents = useCallback(
    (page: number) => {
      if (hasMore && !isEventsLoading) {
        doFetchEvents(
          (api) =>
            api.events.fetchAll({
              ...filters,
              ...DEFAULT_PAGINATION,
              _start: page * DEFAULT_PAGINATION._limit,
            }),
          (res) => res,
        );
      }
    },
    [hasMore, isEventsLoading],
  );

  useEffect(() => {
    if (hasMore) {
      loadEvents(page);
    }
  }, [page, hasMore]);

  useEffect(() => {
    setList(list.concat(data!));
  }, [data]);

  useEffect(() => {
    doFetchEventsCount(
      (api) => api.events.count(filters),
      (res) => res,
    );
  }, []);

  // TODO: add loader component
  const Loader = <div key='loader'>Loading ...</div>;

  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        Past Events
      </Heading>
      <Table styles={styles}>
        <Body zebraStripes={isMobile}>
          {list!.map(({ id, title, maxParticipants, created_at }) => (
            <Row key={id}>
              <Cell width='25%'>
                <TitleWithEllipsis maxLines={1} titleHeight='22px'>
                  {title}
                </TitleWithEllipsis>
              </Cell>
              <Cell width='40%' visible={!isMobile}>
                {isoDateToFormat(created_at, FULL_FORMAT)}
              </Cell>
              <Cell width={isMobile ? '25%' : '15%'}>
                {maxParticipants} members
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
      {isLoading && Loader}
      <Button
        disabled={!hasMore || isLoading}
        variant='secondary'
        onClick={() => setPage(page + 1)}
      >
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
