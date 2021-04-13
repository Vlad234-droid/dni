import React, { FC } from 'react';

import { FULL_FORMAT, isoDateToFormat } from 'utils/date';
import { SmallTile, LargeTile } from 'features/Tile';
import Event from 'features/Event';
import Network from 'features/Network';

import { Wrapper } from './styled';

type Entity = Event | Network;

type Props = {
  items: Entity[];
  link: string;
  hideParticipants?: boolean;
  renderAction: () => JSX.Element;
  isMobile: boolean;
  isLoading?: boolean;
};

// TODO: add loader component
const Loader = <div key='loader'>Loading ...</div>;

const List: FC<Props> = ({
  link,
  items,
  renderAction,
  hideParticipants,
  isMobile,
  isLoading = false,
}) => (
  <Wrapper>
    {items.map(
      //@ts-ignore
      ({ id, maxParticipants, created_at, ...rest }: Entity) =>
        isMobile ? (
          //@ts-ignore
          <SmallTile
            link={link}
            key={id}
            id={id}
            renderAction={renderAction}
            // TODO: remove hack for networks
            meta={
              link === '/networks'
                ? undefined
                : isoDateToFormat(created_at, FULL_FORMAT)
            }
            // TODO: remove hack for networks
            participants={maxParticipants || 300}
            hideParticipants={hideParticipants}
            {...rest}
          />
        ) : (
          //@ts-ignore
          <LargeTile
            link={link}
            id={id}
            key={id}
            renderAction={renderAction}
            // TODO: remove hack for networks
            meta={
              link === '/networks'
                ? undefined
                : isoDateToFormat(created_at, FULL_FORMAT)
            }
            // TODO: remove hack for networks
            participants={maxParticipants || 300}
            {...rest}
          />
        ),
    )}
    {isLoading && Loader}
  </Wrapper>
);

export default List;
