import { Page, PageElement } from 'features/Page';
import { Action } from 'features/Action';

const subPath: Partial<Record<Action, string>> = {
  [Action.CREATE]: '/create',
  [Action.EDIT]: '/:id(\\d+)/edit',
  [Action.GET]: '/:id(\\d+)',
  [Action.LIST]: '',
  [Action.VISIT]: '',
};

type Route = {
  path: string;
  Component: PageElement;
  exact?: boolean;
  page: Page;
};

type BuildPath = (
  page: Page,
  root?: string,
  prefix?: string,
  sufix?: string,
) => string;

type BuildRoute = (page: Page, exact?: boolean) => Route;

export type { Route, BuildPath, BuildRoute };

export { subPath };
