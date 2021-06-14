import { Page, PageElement } from './types';

import Events from '../components/Events';
import Event from '../components/Event';

import About from '../components/About';
import Networks from '../components/Networks';
import Network from '../components/Network';
import NetworkNews from '../components/NetworkNews';
import NotFound from '../components/NotFound';
import ServerError from '../components/ServerError';
import Unauthorized from '../components/Unauthorized';
import Forbidden from '../components/Forbidden';
import Reports from '../components/Reports';
import Profile from '../components/Profile';

const pages: Record<Page, PageElement> = {
  [Page.HOME]: About,
  [Page.ABOUT]: About,
  [Page.EVENTS]: Events,
  [Page.EVENT]: Event,
  [Page.NETWORKS]: Networks,
  [Page.NETWORK]: Network,
  [Page.NETWORK_NEWS]: NetworkNews,
  [Page.NETWORK_POST]: NetworkNews,
  [Page.REPORTS]: Reports,
  [Page.PROFILE]: Profile,
  [Page.UNAUTHORIZED]: Unauthorized,
  [Page.FORBIDDEN]: Forbidden,
  [Page.SERVER_ERROR]: ServerError,
  [Page.NOT_FOUND]: NotFound,
};

export { pages };
