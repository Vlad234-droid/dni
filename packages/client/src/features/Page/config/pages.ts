import { Page, PageElement } from './types';

import Events from '../components/Events';
import About from '../components/About';
import Networks from '../components/Networks';
import AddNetwork from '../components/AddNetwork';
import NewsFeed from '../components/NewsFeed';
import NotFound from '../components/NotFound';
import Reports from '../components/Reports';

const pages: Partial<Record<Page, PageElement>> = {
  [Page.ABOUT]: About,
  [Page.EVENTS]: Events,
  [Page.NETWORKS]: Networks,
  [Page.ADD_NETWORKS]: AddNetwork,
  [Page.NEWS_FEED]: NewsFeed,
  [Page.NOT_FOUND]: NotFound,
  [Page.REPORTS]: Reports,
};

export { pages };
