import { Page, PageElement } from './types';

import Events from '../components/Events';
import Event from '../components/Event';

import About from '../components/About';
import Networks from '../components/Networks';
import Network from '../components/Network';
import NewsFeed from '../components/NewsFeed';
import NotFound from '../components/NotFound';
import Reports from '../components/Reports';
import Profile from '../components/Profile';

const pages: Record<Page, PageElement> = {
  [Page.ABOUT]: About,
  [Page.EVENTS]: Events,
  [Page.EVENT]: Event,
  [Page.NETWORKS]: Networks,
  [Page.NETWORK]: Network,
  [Page.NEWS_FEED]: NewsFeed,
  [Page.REPORTS]: Reports,
  [Page.PROFILE]: Profile,
  [Page.NOT_FOUND]: NotFound,
};

export { pages };
