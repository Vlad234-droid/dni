import { Page } from 'features/Page';
import { UserRole } from 'features/User';
import { Action, buildAction, buildActions } from 'features/Action';

import { Rule, DynamicData } from './types';

const actionRules: Record<UserRole, Rule> = {
  [UserRole.GUEST]: {
    static: [
      buildAction(Page.ABOUT, Action.VISIT),
      // buildAction('postsArchived', Action.VISIT),
    ],
  },
  [UserRole.EMPLOYEE]: {
    static: [
      ...buildActions(Page.EVENTS, [Action.LIST, Action.CREATE]),
      buildAction(Page.ABOUT, Action.VISIT),
      // buildAction('postsArchived', Action.VISIT)
    ],
    dynamic: {
      [buildAction(Page.EVENTS, Action.EDIT)]: ({ userId, ownerId }: DynamicData) => {
        if (!userId || !ownerId) return false;
        return userId === ownerId;
      },
    },
  },
  [UserRole.ADMIN]: {
    static: [
      ...buildActions(Page.EVENTS, [Action.LIST, Action.CREATE, Action.EDIT, Action.DELETE]),
      buildAction(Page.ABOUT, Action.VISIT),
      // buildAction('postsArchived', Action.VISIT)
      // 'postsArchived:visit',
    ],
  },
  [UserRole.MANAGER]: {
    static: [
      ...buildActions(Page.EVENTS, [Action.LIST, Action.CREATE, Action.EDIT, Action.DELETE]),
      buildAction(Page.ABOUT, Action.VISIT),
      // buildAction('postsArchived', Action.VISIT)
    ],
  },
};

export default actionRules;
