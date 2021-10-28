import React, { FC, useCallback, useMemo, useState } from 'react';

import { EntityType } from 'types/entity';

import { AddReactionPayload, DeleteReactionPayload } from '../store';
import { ReactionType, ReactionsCount, Reaction } from '../config/types';
import emojis from '../config/emojis';
import { getAddReactionFilters } from '../utils';
import {
  Wrapper,
  ReactionsList,
  ReactionsItem,
  PostEmotionIconBig,
  PostEmotionIconSmall,
  TotalCount,
  ReactionCount,
  CountDetails,
  DetailsItem,
} from './styled';

interface Props {
  entityId: number;
  entityType: EntityType;
  reactions: ReactionsCount;
  addReaction: (filters: AddReactionPayload) => void;
  deleteReaction: (data: DeleteReactionPayload) => void;
  userReaction?: Reaction;
  uuid?: string;
}

const Reactions: FC<Props> = ({
  entityId,
  entityType,
  reactions,
  addReaction,
  deleteReaction,
  userReaction,
  uuid,
}) => {
  const [reactionsCount, setReactionsCount] = useState(reactions);
  const totalCount = useMemo(
    () => Object.values(reactionsCount).reduce((sum, count) => sum + count, 0),
    [reactionsCount],
  );

  const handleReactionClick = useCallback(
    async (type: ReactionType) => {

      // to narrow the type
      if (!uuid) return;

      // no reaction --> add
      if (!userReaction) {
        const filters = getAddReactionFilters({ type, entityId, uuid, entityType });

        addReaction(filters);

        setReactionsCount((reactionsCount) => ({
          ...reactionsCount,
          [type]: reactionsCount[type] + 1,
        }));
      } else {
        const { type: reactionType, reactionId } = userReaction;

        // reaction exists --> delete or update
        deleteReaction({
          uuid,
          reactionId,
          entityId,
        });

        setReactionsCount((reactionsCount) => ({
          ...reactionsCount,
          [reactionType]: reactionsCount[reactionType] - 1,
        }));

        // another reaction exists --> update
        if (reactionType !== type) {
          const filters = getAddReactionFilters({ type, entityId, uuid, entityType });

          addReaction(filters);

          setReactionsCount((reactionsCount) => ({
            ...reactionsCount,
            [type]: reactionsCount[type] + 1,
          }));
        }
      }
    },
    [userReaction, reactions, reactionsCount, uuid],
  );

  return (
    <Wrapper>
      <ReactionsList>
        {emojis.map(({ type, icon }): JSX.Element => (
          <ReactionsItem
            key={type}
            onClick={() => {
              handleReactionClick(type);
            }}
          >
            <PostEmotionIconBig
              activeIconSrc={icon.active}
              defaultIconSrc={icon.default}
              isActive={userReaction?.type === type}
            />
            <ReactionCount>{reactionsCount[type]}</ReactionCount>
          </ReactionsItem>
        ))}
        <TotalCount>
          <CountDetails>
            {emojis.map(({ type, icon }): JSX.Element => (
              <DetailsItem key={type}>
                <PostEmotionIconSmall activeIconSrc={icon.active} />
                {reactionsCount[type]}
              </DetailsItem>
            ))}
          </CountDetails>
          <span>{totalCount}</span>
        </TotalCount>
      </ReactionsList>
    </Wrapper>
  );
};

export default Reactions;
