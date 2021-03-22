import pick from 'lodash.pick';
import omit from 'lodash.omit';

import { Page } from 'features/Page';

import { IconSrc } from './types';
import iconEvents from '../assets/icon-events.svg';
import iconEventsInv from '../assets/icon-events-inv.svg';
import iconNetworks from '../assets/icon-networks.svg';
import iconNetworksInv from '../assets/icon-networks-inv.svg';
import iconNewsFeed from '../assets/icon-news-feed.svg';
import iconNewsFeedInv from '../assets/icon-news-feed-inv.svg';

export type PageWithIcon = Page.EVENTS | Page.NETWORKS | Page.NEWS_FEED;

const iconsSrc: Record<PageWithIcon, IconSrc> = {
  [Page.EVENTS]: {
    default: iconEvents,
    active: iconEventsInv,
  },
  [Page.NETWORKS]: {
    default: iconNetworks,
    active: iconNetworksInv,
  },
  [Page.NEWS_FEED]: {
    default: iconNewsFeed,
    active: iconNewsFeedInv,
  },
};

const menuItems = {
  [Page.NEWS_FEED]: 'News feed',
  [Page.EVENTS]: 'Events',
  [Page.NETWORKS]: 'Networks',
  [Page.REPORTS]: 'Reports',
  [Page.ABOUT]: 'About',
};

const itemsVisible = [Page.NEWS_FEED, Page.EVENTS, Page.NETWORKS];

const menuItemsMobile = {
  visible: pick(menuItems, itemsVisible),
  hidden: omit(menuItems, itemsVisible),
};

export { menuItems, menuItemsMobile, iconsSrc, itemsVisible };
