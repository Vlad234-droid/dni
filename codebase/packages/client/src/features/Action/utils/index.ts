import { Page } from 'features/Page';

import { Action, Component } from '../config/types';

export const buildAction = (resource: Page | Component, action: Action = Action.VISIT) => `${resource}:${action}`;

export const buildActions = (resource: Page, actions: Action[]) =>
  actions.map((action) => buildAction(resource, action));
