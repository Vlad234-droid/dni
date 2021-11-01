import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import useStore from 'hooks/useStore';
import { EntityType } from 'types/entity';
import useDispatch from 'hooks/useDispatch';

import { addReaction, deleteReaction, byIdSelector, AddReactionPayload, DeleteReactionPayload } from '../store';
import {  ReactionsCount } from '../config/types';
import Reactions from './Reactions';

interface Props {
  entityId: number;
  entityType: EntityType;
  reactions: ReactionsCount;
}

const ReactionsContainer: FC<Props> = ({ entityId, entityType, reactions }) => {
  const dispatch = useDispatch();
  const { user } = useStore((state) => state.auth);
  const userReaction = useSelector(byIdSelector(entityId));

  const addOneReaction = (filters: AddReactionPayload) => dispatch(addReaction(filters));
  const deleteOneReaction = (data: DeleteReactionPayload) => dispatch(deleteReaction(data));

  return (
    <Reactions
      addReaction={addOneReaction}
      deleteReaction={deleteOneReaction}
      entityId={entityId}
      entityType={entityType}
      reactions={reactions}
      userReaction={userReaction}
      uuid={user.colleagueUUID}
    />
  );
};

export default ReactionsContainer;
