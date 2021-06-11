import React, { FC } from 'react';

import { HorizontalTile, VerticalTile, Type } from 'features/Tile';
import Event from 'features/Event';
import Network from 'features/Network';

import { isEventOnAir } from '../Event/utils';
import { useMedia } from '../../context/InterfaceContext';
import { Wrapper } from './styled';

type Entity = Event | Network;

type Props = {
  type?: Type;
  items: Entity[];
  link: string;
  renderAction: (id: number, maxParticipants?: number) => JSX.Element;
  renderParticipants?: (id: number, maxParticipants?: number) => JSX.Element;
  actionDisabled?: boolean;
};

const List: FC<Props> = ({
  link,
  items,
  renderAction,
  renderParticipants,
  type,
}) => {
  const { isMobile, isLargeMobile } = useMedia();
  const propertiesExtractor = ({
    id,
    //@ts-ignore
    maxParticipants,
    //@ts-ignore
    startDate,
    //@ts-ignore
    endDate,
    ...rest
  }: Entity) => ({
    key: id,
    id,
    link,
    meta: startDate,
    renderAction: () => renderAction(id, maxParticipants),
    renderParticipants: () =>
      renderParticipants && renderParticipants(id, maxParticipants),
    isOnAir: startDate && endDate && isEventOnAir(startDate, endDate),
    ...rest,
  });

  return (
    <Wrapper>
      {items.map((entity: Entity) =>
        isMobile || isLargeMobile ? (
          //@ts-ignore
          <HorizontalTile {...propertiesExtractor(entity)} />
        ) : (
          //@ts-ignore
          <VerticalTile type={type} {...propertiesExtractor(entity)} />
        ),
      )}
    </Wrapper>
  );
};

export default List;
