import { Page } from 'features/Page';
import { buildRoute } from '../utils';

const routes = [
  Page.ABOUT,
  Page.EVENTS,
  Page.EVENT,
  Page.NETWORKS,
  Page.NETWORK,
  Page.NETWORK_NEWS,
  Page.NETWORK_POST,
  Page.REPORTS,
  Page.PROFILE,
  Page.NOTIFICATION_SETTINGS,
  Page.ACCESSIBILITY,
  //Page.UNAUTHORIZED,
  Page.FORBIDDEN,
  Page.SERVER_ERROR,
  Page.NOT_FOUND,
].map((element) => buildRoute(element));

export { routes };
