import React, { FC } from 'react';

import { HorizontalTile, VerticalTile, Type } from 'features/Tile';
import Event from 'features/Event';
import Network from 'features/Network';
import { Page } from 'features/Page';

import { isEventOnAir } from '../Event/utils';
import { useMedia } from '../../context/InterfaceContext';
import { Wrapper } from './styled';

type Entity = Event | Network;

type Props = {
  type?: Type;
  items: Entity[];
  link: string;
  hideParticipants?: boolean;
  hideMaxParticipants?: boolean;
  participants?: Record<number, number>;
  renderAction: (id: number, disabled: boolean) => JSX.Element;
};

const List: FC<Props> = ({
  link,
  items,
  renderAction,
  hideParticipants,
  hideMaxParticipants,
  participants,
  type,
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
  }: Entity) => ({
    key: id,
    id,
    link,
    renderAction: () =>
      renderAction(
        id,
        hideParticipants ||
          (Boolean(maxParticipants) &&
            Boolean(participants) &&
            participants![id] >= maxParticipants),
      ),
    meta: link === Page.NETWORKS ? undefined : startDate,
    participants: !hideParticipants && (participants![id] || 0),
    maxParticipants: maxParticipants,
    hideMaxParticipants: hideMaxParticipants,
    isOnAir: link === Page.EVENTS && isEventOnAir(startDate, endDate),
    ...rest,
  });

  return (
    <Wrapper>
      {items.map((entity: Entity) =>
        isMobile ? (
          //@ts-ignore
          <HorizontalTile {...propertiesExtractor(entity)} />
        ) : (
          //@ts-ignore
          <VerticalTile
            hideParticipants={hideParticipants}
            type={type}
            {...propertiesExtractor(entity)}
          />
        ),
      )}
    </Wrapper>
  );
};

export default List;
