import pick from 'lodash.pick';
import omit from 'lodash.omit';

import { Page } from 'features/Page';

import { IconSrc, PageWithIcon } from './types';
import iconEvents from '../assets/icon-events.svg';
import iconEventsInv from '../assets/icon-events-inv.svg';
import iconNetworks from '../assets/icon-networks.svg';
import iconNetworksInv from '../assets/icon-networks-inv.svg';
import iconNetworkNews from '../assets/icon-network-news.svg';
import iconNetworkNewsInv from '../assets/icon-network-news-inv.svg';

const iconsSrc: Record<PageWithIcon, IconSrc> = {
  [Page.EVENTS]: {
    default: iconEvents,
    active: iconEventsInv,
  },
  [Page.NETWORKS]: {
    default: iconNetworks,
    active: iconNetworksInv,
  },
  [Page.NETWORK_NEWS]: {
    default: iconNetworkNews,
    active: iconNetworkNewsInv,
  },
};

const menuItems = {
  [Page.NETWORK_NEWS]: 'Network News',
  [Page.EVENTS]: 'Events',
  [Page.NETWORKS]: 'Networks',
  [Page.REPORTS]: 'Reports',
  [Page.ABOUT]: 'About',
};

const itemsVisible = [Page.NETWORK_NEWS, Page.EVENTS, Page.NETWORKS];

const menuItemsDesktop = menuItems;
const menuItemsMobile = {
  visible: pick(menuItems, itemsVisible),
  hidden: omit(menuItems, itemsVisible),
};

export { menuItemsDesktop, menuItemsMobile, iconsSrc, itemsVisible };
