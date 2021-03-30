import { Page, PageElement } from './types';

import Events from '../components/Events';
import About from '../components/About';
import Networks from '../components/Networks';
import NewsFeed from '../components/NewsFeed';
import NotFound from '../components/NotFound';
import Reports from '../components/Reports';

const pages: Record<Page, PageElement> = {
  [Page.ABOUT]: About,
  [Page.EVENTS]: Events,
  [Page.NETWORKS]: Networks,
  [Page.NEWS_FEED]: NewsFeed,
  [Page.REPORTS]: Reports,
  [Page.NOT_FOUND]: NotFound,
};

export { pages };
