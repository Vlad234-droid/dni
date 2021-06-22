import { Dispatch } from 'react';

import * as A from '@energon/array-utils';

export const bindReducerActions = <ActionType>(
  actions: ((payload: any) => ActionType)[],
  dispatch: Dispatch<ActionType>,
) =>
  A.map(
    (action) =>
      (...payload: Parameters<typeof action>) =>
        dispatch(action(...payload)),
    actions,
  );
