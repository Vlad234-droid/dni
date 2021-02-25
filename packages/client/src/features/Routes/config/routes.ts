import { Route } from './types';
import { Page } from 'features/Page';
import { buildRoute } from '../utils';

const routes: Partial<Route>[] = [
  Page.ABOUT,
  Page.DASHBOARD,
  Page.EVENTS,
  Page.NETWORKS,
  Page.NEWS_FEED,
  Page.PROFILE,
  Page.REPORTS,
  Page.SURVEYS,
  Page.USERS,
  Page.NOT_FOUND,
].map((element) => buildRoute(element));

export { routes };
