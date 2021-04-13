import { Page } from 'features/Page';
import { buildRoute } from '../utils';

const routes = [
  Page.ABOUT,
  Page.EVENTS,
  Page.NETWORKS,
  Page.NETWORK,
  Page.NEWS_FEED,
  Page.REPORTS,
  Page.NOT_FOUND,
].map((element) => buildRoute(element));

export { routes };
