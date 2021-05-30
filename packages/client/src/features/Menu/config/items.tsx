import { Page } from 'features/Page';

import { PageWithIcon } from './types';

const iconsSrc: Record<PageWithIcon, string> = {
  [Page.HOME]: 'home',
  [Page.NETWORK_NEWS]: 'feedback',
  [Page.EVENTS]: 'datePicker',
  [Page.NETWORKS]: 'account',
  [Page.ABOUT]: 'info',
};

const menuItemsDesktop = {
  [Page.NETWORK_NEWS]: 'Network News',
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

export const mainMenuItemsDesktop = [
  {
    href: 'https://www.ourtesco.com/colleague',
    id: 'home',
    text: 'Home',
  },
  {
    href: 'https://www.ourtesco.com/colleague/news',
    id: 'news-and-views',
    text: 'News & Views',
  },
  {
    href: '#',
    id: 'reward-and-benefits',
    text: 'Reward & Benefits',
  },
  {
    href: 'https://www.ourtesco.com/colleague/working-at-tesco',
    id: 'working-at-tesco',
    text: 'Working at Tesco',
  },
  {
    href: 'https://www.ourtesco.com/colleague/our-community',
    id: 'our-community',
    text: 'Our Community',
  },
  {
    href: 'https://www.ourtesco.com/colleague/health-and-wellbeing',
    id: 'health-and-wellbeing',
    text: 'Health and Wellbeing',
  },
  {
    href: '/',
    id: 'diversity-and-inclusion',
    text: 'Diversity and Inclusion',
  },
];

export const mainMoreMenuItemsDesktop = {
  href: '#',
  text: 'More',
};

export const mainMenuItemMobile = {
  href: '#',
  text: 'Menu',
};

export { menuItemsDesktop, menuItemsMobile, iconsSrc };
