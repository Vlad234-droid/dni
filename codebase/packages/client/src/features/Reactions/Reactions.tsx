import React, { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import useStore from 'hooks/useStore';
import { EntityType } from 'types/entity';
import useDispatch from 'hooks/useDispatch';
import { addReaction, deleteReaction, selectReactionPerEntity } from 'features/Auth';

import { ReactionType, ReactionsCount } from './config/types';
import emojis from './config/emojis';
import { getAddReactionFilters } from './utils';
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
}

const Reactions: FC<Props> = ({ entityId, entityType, reactions }) => {
  const dispatch = useDispatch();
  const { user } = useStore((state) => state.auth);
  const userReaction = useSelector(selectReactionPerEntity(entityId));
  const [reactionsCount, setReactionsCount] = useState(reactions);
  const totalCount = useMemo(
    () => Object.values(reactionsCount).reduce((sum, count) => sum + count, 0),
    [reactionsCount],
  );

  const handleReactionClick = useCallback(
    async (type: ReactionType) => {
      // no reaction --> add
      if (!userReaction) {
        const filters = getAddReactionFilters({ type, entityId, uuid: user.colleagueUUID, entityType });
        dispatch(addReaction(filters));
        setReactionsCount((reactionsCount) => ({
          ...reactionsCount,
          [type]: reactionsCount[type] + 1,
        }));
      } else {
        // reaction exists --> delete or update
        await dispatch(deleteReaction({
          uuid: user.colleagueUUID,
          id: userReaction.id,
          type: userReaction.type,
        }));

        setReactionsCount((reactionsCount) => ({
          ...reactionsCount,
          [userReaction.type]: reactionsCount[userReaction.type] - 1,
        }));

        // another reaction exists --> update
        if (userReaction.type !== type) {
          const filters = getAddReactionFilters({ type, entityId, uuid: user.colleagueUUID, entityType });
          dispatch(addReaction(filters));
          setReactionsCount((reactionsCount) => ({
            ...reactionsCount,
            [type]: reactionsCount[type] + 1,
          }));
        }
      }
    },
    [userReaction, reactions, reactionsCount],
  );

  return (
    <Wrapper>
      <ReactionsList>
        {emojis.map(({ type, icon }) => (
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
            <ReactionCount>
              {reactionsCount[type]}
            </ReactionCount>
          </ReactionsItem>
        ))}
        <TotalCount>
          <CountDetails>
            {emojis.map(({ type, icon }) => (
              <DetailsItem key={type}>
                <PostEmotionIconSmall activeIconSrc={icon.active} />
                {reactionsCount[type]}
              </DetailsItem>
            ))}
          </CountDetails>
          {totalCount}
        </TotalCount>
      </ReactionsList>
    </Wrapper>
  );
};

export default Reactions;
