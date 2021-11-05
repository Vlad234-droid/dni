import { Page } from 'features/Page';
import { UserRole } from 'features/User';
import { Action, Component, buildAction, buildActions } from 'features/Action';

import { Rule, DynamicData } from './types';

const actionRules: Record<UserRole, Rule> = {
  [UserRole.GUEST]: {
    static: [
      buildAction(Page.ABOUT, Action.VISIT),
      //buildAction(Page.UNAUTHORIZED, Action.VISIT),
      buildAction(Page.FORBIDDEN, Action.VISIT),
      buildAction(Page.SERVER_ERROR, Action.VISIT),
      buildAction(Page.NOT_FOUND, Action.VISIT),
    ],
  },
  [UserRole.EMPLOYEE]: {
    static: [
      // ...buildActions(Page.EVENTS, [Action.LIST, Action.CREATE]),
      buildAction(Page.ABOUT, Action.VISIT),
      buildAction(Page.HOME, Action.VISIT),
      buildAction(Page.EVENTS, Action.VISIT),
      buildAction(Page.EVENT, Action.VISIT),
      buildAction(Page.NETWORKS, Action.VISIT),
      buildAction(Page.NETWORK, Action.VISIT),
      buildAction(Page.NETWORK_NEWS, Action.VISIT),
      buildAction(Page.NETWORK_POST, Action.VISIT),
      buildAction(Page.PROFILE, Action.VISIT),
      buildAction(Page.NOTIFICATION_SETTINGS, Action.VISIT),
      buildAction(Page.EMAIL_CONFIRMATION, Action.VISIT),
      //buildAction(Page.UNAUTHORIZED, Action.VISIT),
      buildAction(Page.FORBIDDEN, Action.VISIT),
      buildAction(Page.SERVER_ERROR, Action.VISIT),
      buildAction(Page.NOT_FOUND, Action.VISIT),
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
      buildAction(Page.HOME, Action.VISIT),
      buildAction(Page.EVENTS, Action.VISIT),
      buildAction(Page.EVENT, Action.VISIT),
      buildAction(Page.NETWORKS, Action.VISIT),
      buildAction(Page.NETWORK, Action.VISIT),
      buildAction(Page.NETWORK_NEWS, Action.VISIT),
      buildAction(Page.NETWORK_POST, Action.VISIT),
      buildAction(Page.REPORTS, Action.VISIT),
      buildAction(Page.PROFILE, Action.VISIT),
      buildAction(Page.NOTIFICATION_SETTINGS, Action.VISIT),
      buildAction(Page.EMAIL_CONFIRMATION, Action.VISIT),
      //buildAction(Page.UNAUTHORIZED, Action.VISIT),
      buildAction(Page.FORBIDDEN, Action.VISIT),
      buildAction(Page.SERVER_ERROR, Action.VISIT),
      buildAction(Page.NOT_FOUND, Action.VISIT),
      buildAction(Component.POST_ARCHIVED, Action.LIST),
      buildAction(Component.NETWORK_PARTICIPANTS, Action.LIST),
      buildAction(Component.CMS_LINK, Action.LIST),
    ],
  },
  [UserRole.MANAGER]: {
    static: [
      ...buildActions(Page.EVENTS, [Action.LIST, Action.CREATE, Action.EDIT, Action.DELETE]),
      buildAction(Page.ABOUT, Action.VISIT),
      buildAction(Page.HOME, Action.VISIT),
      buildAction(Page.EVENTS, Action.VISIT),
      buildAction(Page.EVENT, Action.VISIT),
      buildAction(Page.NETWORKS, Action.VISIT),
      buildAction(Page.NETWORK, Action.VISIT),
      buildAction(Page.NETWORK_NEWS, Action.VISIT),
      buildAction(Page.NETWORK_POST, Action.VISIT),
      buildAction(Page.REPORTS, Action.VISIT),
      buildAction(Page.PROFILE, Action.VISIT),
      buildAction(Page.NOTIFICATION_SETTINGS, Action.VISIT),
      buildAction(Page.EMAIL_CONFIRMATION, Action.VISIT),
      buildAction(Page.FORBIDDEN, Action.VISIT),
      //buildAction(Page.UNAUTHORIZED, Action.VISIT),
      buildAction(Page.SERVER_ERROR, Action.VISIT),
      buildAction(Page.NOT_FOUND, Action.VISIT),
      buildAction(Component.POST_ARCHIVED, Action.LIST),
      buildAction(Component.NETWORK_PARTICIPANTS, Action.LIST),
      buildAction(Component.CMS_LINK, Action.LIST),
    ],
  },
};

export default actionRules;
