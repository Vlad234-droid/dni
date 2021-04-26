import { Page } from 'features/Page';
import { buildRoute } from '../utils';

const routes = [
  Page.ABOUT,
  Page.EVENTS,
  Page.EVENT,
  Page.NETWORKS,
  Page.NETWORK,
  Page.NETWORK_NEWS,
  Page.REPORTS,
  Page.PROFILE,
  Page.NOT_FOUND,
].map((element) => buildRoute(element));

export { routes };
