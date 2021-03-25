import { FC, useEffect, useState } from 'react';
import Button from '@beans/button';
import { useSelector } from 'react-redux';

import Heading, { Size, Color } from 'features/Heading';
import { SmallTile } from 'features/Tile';
import { Wrapper, ListContainer } from './styled';
import useDispatch from 'hooks/useDispatch';
import { normalizeImage } from 'utils/content';
import { FilterPayload } from 'utils/storeHelper';
import { Filter } from '../../config/types';
import { getList, listSelector } from '../../store';

type Props = {
  filter?: Filter;
};

const NetworkList: FC<Props> = ({ filter }) => {
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
      case 'ALL': {
        where = '';
        break;
      }
      case 'YOUR_NETWORKS': {
        where = [{ createdBy_eq: 1 }];
        break;
      }
      case 'YOU_MANAGE': {
        where = [{ managers_contains: 1 }];
        break;
      }
    }
    setFilters({ ...filters, _where: JSON.stringify(where) });
    setWithFilter(true);
  }, [filter]);

  return (
    <Wrapper>
      <Heading size={Size.md} color={Color.black}>
        New Networks
      </Heading>
      <ListContainer>
        {list.map(({ id, title, image }) => (
          <SmallTile
            link='/networks'
            renderAction={() => (
              <Button variant='primary' onClick={() => console.log('test')}>
                Join
              </Button>
            )}
            id={id}
            key={`networks-${id}`}
            title={title}
            participants={300}
            image={normalizeImage(image)}
          />
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default NetworkList;
