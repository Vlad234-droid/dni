import pick from 'lodash.pick';
import omit from 'lodash.omit';

import { Page } from 'features/Page';

import { PageWithIcon } from './types';

const iconsSrc: Record<PageWithIcon, string> = {
  [Page.EVENTS]: 'datePicker',
  [Page.NETWORKS]: 'account',
  [Page.NETWORK_NEWS]: 'feedback',
};

const menuItems = {
  [Page.NETWORK_NEWS]: 'News',
  [Page.EVENTS]: 'Events',
  [Page.REPORTS]: 'Reports',
  [Page.NETWORKS]: 'Networks',
  [Page.ABOUT]: 'About',
};

const itemsVisible = [Page.NETWORK_NEWS, Page.EVENTS, Page.NETWORKS];

const menuItemsDesktop = menuItems;
const menuItemsMobile = {
  visible: pick(menuItems, itemsVisible),
  hidden: omit(menuItems, itemsVisible),
};

export { menuItemsDesktop, menuItemsMobile, iconsSrc, itemsVisible };
