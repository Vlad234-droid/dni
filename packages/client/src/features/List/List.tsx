import React, { FC } from 'react';

import { FULL_FORMAT, isoDateToFormat } from 'utils/date';
import { SmallTile, LargeTile } from 'features/Tile';
import Event from 'features/Event';
import Network from 'features/Network';
import { Page } from 'features/Page';

import { Wrapper } from './styled';

type Entity = Event | Network;

type Props = {
  items: Entity[];
  link: string;
  hideMaxParticipants?: boolean;
  participants?: Record<number, number>;
  renderAction: (id: number, disabled: boolean) => JSX.Element;
  isMobile: boolean;
  isLoading?: boolean;
};

// TODO: add loader component
const Loader = <div key='loader'>Loading ...</div>;

const List: FC<Props> = ({
  link,
  items,
  renderAction,
  hideMaxParticipants,
  participants,
  isMobile,
  isLoading = false,
}) => {
  const propertiesExtractor = ({
    id,
    //@ts-ignore
    maxParticipants,
    //@ts-ignore
    startDate,
    ...rest
  }: Entity) => {
    const actualParticipants = participants![id] || 0;
    return {
      key: id,
      id,
      link,
      renderAction: () =>
        renderAction(id, actualParticipants >= maxParticipants),
      meta:
        link === Page.NETWORKS
          ? undefined
          : isoDateToFormat(startDate, FULL_FORMAT),
      participants: actualParticipants,
      maxParticipants: maxParticipants,
      hideMaxParticipants: hideMaxParticipants,
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
      {isLoading && Loader}
    </Wrapper>
  );
};

export default List;
