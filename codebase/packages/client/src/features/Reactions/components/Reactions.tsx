import React, { FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import useStore from 'hooks/useStore';
import { EntityType } from 'types/entity';
import useDispatch from 'hooks/useDispatch';

import { addReaction, deleteReaction, byIdSelector } from '../store';
import { ReactionType, ReactionsCount } from '../config/types';
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
}

const Reactions: FC<Props> = ({ entityId, entityType, reactions }) => {
  const dispatch = useDispatch();
  const { user } = useStore((state) => state.auth);
  const userReaction = useSelector(byIdSelector(entityId));
  const [reactionsCount, setReactionsCount] = useState(reactions);
  console.log('reactions', reactions);
  console.log('reactionsCount', reactionsCount);
  const totalCount = useMemo(
    () => Object.values(reactionsCount).reduce((sum, count) => sum + count, 0),
    [reactionsCount],
  );

  console.log('totalCount', totalCount);
  const handleReactionClick = useCallback(
    async (type: ReactionType) => {

      // to narrow the type
      if (!user.colleagueUUID) return;

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
          reactionId: userReaction.reactionId,
          entityId,
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
    [userReaction, reactions, reactionsCount, user],
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
