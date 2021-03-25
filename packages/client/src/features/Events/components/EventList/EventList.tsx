import { FC, useEffect, useState } from 'react';
import Button from '@beans/button';
import { useSelector } from 'react-redux';

import Heading, { Size, Color } from 'features/Heading';
import { SmallTile } from 'features/Tile';

import { Wrapper, ListContainer } from './styled';

import useDispatch from 'hooks/useDispatch';
import { normalizeImage } from 'utils/content';
import {
  isoDateToFormat,
  firstDayOf,
  lastDayOf,
  FULL_FORMAT,
} from 'utils/date';
import { FilterPayload } from 'utils/storeHelper';

import { getList, listSelector } from '../../store';
import { Filter } from '../../config/types';

type Props = {
  filter?: Filter;
};

const EventList: FC<Props> = ({ filter }) => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<FilterPayload>({
    _start: 0,
    _limit: 10,
  });
  const [withFilter, setWithFilter] = useState(false);

  const list = useSelector(listSelector);

  useEffect(() => {
    if (withFilter) {
      dispatch(getList(filters));
    }
  }, [filters, withFilter]);

  useEffect(() => {
    let where;
    switch (filter) {
      case 'ON_AIR': {
        const currentDate = new Date();
        where = [
          { startedAt_lte: currentDate },
          { finishedAt_gte: currentDate },
        ];
        break;
      }
      case 'THIS_MONTH': {
        const firstDayOfThisMonth = firstDayOf('month');
        const lastDayOfThisMonth = lastDayOf('month');
        where = [
          { startedAt_gte: firstDayOfThisMonth },
          { startedAt_lgte: lastDayOfThisMonth },
        ];
        break;
      }
    }
    setFilters({ ...filters, _where: JSON.stringify(where) });
    setWithFilter(true);
  }, [filter]);

  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        New Events
      </Heading>
      <ListContainer>
        {list.map(({ id, title, maxParticipants, image, created_at }) => (
          <SmallTile
            link='/events'
            key={`events-${id}`}
            id={id}
            title={title}
            participants={maxParticipants}
            renderAction={() => (
              <Button variant='primary' onClick={() => console.log('test')}>
                Take part
              </Button>
            )}
            renderMeta={() => (
              <span>{isoDateToFormat(created_at, FULL_FORMAT)}</span>
            )}
            image={normalizeImage(image)}
          />
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default EventList;
