import { Page, PageElement } from './types';

import Dashboard from '../components/Dashboard';
import Events from '../components/Events';
import About from '../components/About';
import Networks from '../components/Networks';
import NewsFeed from '../components/NewsFeed';
import NotFound from '../components/NotFound';
import Profile from '../components/Profile';
import Reports from '../components/Reports';
import Surveys from '../components/Surveys';
import Users from '../components/Users';

const pages: Partial<Record<Page, PageElement>> = {
  [Page.ABOUT]: About,
  [Page.DASHBOARD]: Dashboard,
  [Page.EVENTS]: Events,
  [Page.NETWORKS]: Networks,
  [Page.NEWS_FEED]: NewsFeed,
  [Page.NOT_FOUND]: NotFound,
  [Page.PROFILE]: Profile,
  [Page.REPORTS]: Reports,
  [Page.SURVEYS]: Surveys,
  [Page.USERS]: Users,
};

export { pages };
