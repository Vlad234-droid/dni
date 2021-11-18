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
    () => reactionsCount ? Object.values(reactionsCount).reduce((sum, count) => sum + count, 0) : 0,
    [reactionsCount],
  );
  const [canPerform, setCanPerform] = useState(true);

  const handleCreation = useCallback(async (type: ReactionType) => {
    // to narrow the type
    if (!uuid) return;

    // disable action
    setCanPerform(false);

    const filters = getAddReactionFilters({ type, entityId, uuid, entityType });
    const res = await addReaction(filters);
    setReactionsCount((reactionsCount) => ({
      ...reactionsCount,
      [type]: reactionsCount[type] + 1,
    }));

    // if success enable actions
    // @ts-ignore
    if (res.payload) {
      setCanPerform(true);
    }
  }, [reactionsCount, uuid, canPerform]);

  const handleDelete = useCallback(async (type: ReactionType, reactionType: ReactionType, reactionId: number) => {
    // to narrow the type
    if (!uuid) return;

    // disable action
    setCanPerform(false);

    // reaction exists --> delete or update
    const res = await deleteReaction({
      uuid,
      reactionId,
      entityId,
    });
    setReactionsCount((reactionsCount) => ({
      ...reactionsCount,
      [reactionType]: reactionsCount[reactionType] - 1,
    }));

    // if success enable actions
    // @ts-ignore
    if (res.payload) {
      setCanPerform(true);
    }
  }, [reactionsCount, uuid]);


  const changeHandler = useCallback(
    async (type: ReactionType) => {

      if (!canPerform) return;

      // no reaction --> add
      if (!userReaction) {
        await handleCreation(type);
      } else {
        const { type: reactionType, reactionId } = userReaction;
        await handleDelete(type, reactionType, reactionId);

        // another reaction exists --> update
        if (reactionType !== type) {
          await handleCreation(type);
        }
      }
    },
    [userReaction, canPerform],
  );

  return (
    <Wrapper data-testid='reactions'>
      <ReactionsList>
        {emojis.map(({ type, icon }): JSX.Element => (
          <ReactionsItem
            data-testid={`reactions-item-${type}`}
            key={type}
            onClick={() => {
              changeHandler(type);
            }}
          >
            <PostEmotionIconBig
              data-testid={`reaction-icon-${type}`}
              activeIconSrc={icon.active}
              defaultIconSrc={icon.default}
              isActive={userReaction?.type === type}
            />
            {reactionsCount && <ReactionCount data-testid={`reactions-count-${type}`}>{reactionsCount[type]}</ReactionCount>}
          </ReactionsItem>
        ))}
        <TotalCount>
          <CountDetails>
            {emojis.map(({ type, icon }): JSX.Element => (
              <DetailsItem key={type}>
                <PostEmotionIconSmall activeIconSrc={icon.active} />
                {reactionsCount && reactionsCount[type]}
              </DetailsItem>
            ))}
          </CountDetails>
          <span data-testid='reactions-total-count'>{totalCount}</span>
        </TotalCount>
      </ReactionsList>
    </Wrapper>
  );
};

export default Reactions;
