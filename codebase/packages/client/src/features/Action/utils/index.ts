import { Page } from 'features/Page';

import { Action } from '../config/types';

export const buildAction = (resource: Page, action: Action = Action.VISIT) =>
  `${resource}:${action}`;

export const buildActions = (resource: Page, actions: Action[]) =>
  actions.map((action) => buildAction(resource, action));
