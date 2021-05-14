import React, { FC } from 'react';

import { SmallTile, LargeTile } from 'features/Tile';
import Event from 'features/Event';
import Network from 'features/Network';
import { Page } from 'features/Page';

import { Wrapper } from './styled';
import { isEventOnAir } from '../Event/utils';
import { useMedia } from '../../context/InterfaceContext';

type Entity = Event | Network;

type Props = {
  items: Entity[];
  link: string;
  hideMaxParticipants?: boolean;
  participants?: Record<number, number>;
  renderAction: (id: number, disabled: boolean) => JSX.Element;
};

const List: FC<Props> = ({
  link,
  items,
  renderAction,
  hideMaxParticipants,
  participants,
}) => {
  const { isMobile } = useMedia();
  const propertiesExtractor = ({
    id,
    //@ts-ignore
    maxParticipants,
    //@ts-ignore
    startDate,
    //@ts-ignore
    endDate,
    ...rest
  }: Entity) => {
    const actualParticipants = participants![id] || 0;
    return {
      key: id,
      id,
      link,
      renderAction: () =>
        renderAction(
          id,
          Boolean(maxParticipants) && actualParticipants >= maxParticipants,
        ),
      meta: link === Page.NETWORKS ? undefined : startDate,
      participants: actualParticipants,
      maxParticipants: maxParticipants,
      hideMaxParticipants: hideMaxParticipants,
      isOnAir: link === Page.EVENTS && isEventOnAir(startDate, endDate),
      ...rest,
    };
  };

  return (
    <Wrapper>
      {items.map((entity: Entity) =>
        isMobile ? (
          //@ts-ignore
          <SmallTile {...propertiesExtractor(entity)} />
        ) : (
          //@ts-ignore
          <LargeTile {...propertiesExtractor(entity)} />
        ),
      )}
    </Wrapper>
  );
};

export default List;
