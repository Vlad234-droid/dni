import { Page } from 'features/Page';

const iconsSrc = {
  [Page.HOME]: 'home',
  [Page.NETWORK_NEWS]: 'feedback',
  [Page.EVENTS]: 'datePicker',
  [Page.NETWORKS]: 'account',
  [Page.ABOUT]: 'info',
};

const menuItemsDesktop = {
  [Page.NETWORK_NEWS]: 'News',
  [Page.EVENTS]: 'Events',
  [Page.REPORTS]: 'Reports',
  [Page.NETWORKS]: 'Networks',
  [Page.ABOUT]: 'About',
};

const menuItemsMobile = {
  [Page.HOME]: 'Home',
  [Page.NETWORK_NEWS]: 'News',
  [Page.EVENTS]: 'Events',
  [Page.NETWORKS]: 'Networks',
  [Page.ABOUT]: 'About',
};

export { menuItemsDesktop, menuItemsMobile, iconsSrc };
