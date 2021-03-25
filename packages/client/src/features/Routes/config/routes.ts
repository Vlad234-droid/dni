import { Page } from 'features/Page';
import { buildRoute } from '../utils';

const routes = [
  Page.ABOUT,
  Page.EVENTS,
  Page.CREATE_EVENTS,
  Page.NETWORKS,
  Page.ADD_NETWORKS,
  Page.NEWS_FEED,
  Page.REPORTS,
  Page.NOT_FOUND,
].map((element) => buildRoute(element));

export { routes };
