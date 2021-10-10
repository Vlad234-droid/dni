import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash.isempty';
import remove from 'lodash.remove';
import debounce from 'lodash.debounce';

import useStore from 'hooks/useStore';
import { EntityType } from 'types/entity';
import useDispatch from 'hooks/useDispatch';

import { Variant } from './config/types';
import { byIdSelector, changeReactions, getEmojis } from './store';
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
}

const Reactions: FC<Props> = ({ entityId, entityType }) => {
  const dispatch = useDispatch();
  const userReactions = useSelector(byIdSelector(entityId));
  const [reactionsCount, setReactionsCount] = useState<Record<Variant, number>>(userReactions!.reactionsCount);
  const [activeReactions, setActiveReactions] = useState<Variant[]>(userReactions!.reactions);
  const { emojis } = useStore((state) => state.reactions);
  const totalCount = useMemo(
    () => Object.values(reactionsCount).reduce((sum, count) => sum + count, 0),
    [reactionsCount],
  );
  const debouncedChangeHandler = useMemo(
    () => debounce((reactions) => dispatch(changeReactions({ id: entityId, entityType, reactions })), 1000),
    [],
  );

  useEffect(
    () => () => {
      debouncedChangeHandler.cancel();
    },
    [],
  );

  useEffect(() => {
    if (isEmpty(emojis)) {
      dispatch(getEmojis());
    }
  }, [emojis]);

  const handleReactionClick = useCallback(
    (variant: Variant) => {
      let reactions = activeReactions;
      if (activeReactions.includes(variant)) {
        // remove reaction
        reactions = remove(reactions.slice(), (reaction) => reaction !== variant);
        setReactionsCount({
          ...reactionsCount,
          [variant]: reactionsCount[variant] - 1,
        });
      } else {
        // add reaction
        reactions = [...reactions, variant];
        setReactionsCount({
          ...reactionsCount,
          [variant]: reactionsCount[variant] + 1,
        });
      }

      setActiveReactions(reactions);
      debouncedChangeHandler(reactions);
    },
    [activeReactions],
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
              isActive={activeReactions.includes(type)}
            />
            <ReactionCount>{reactionsCount[type]}</ReactionCount>
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
