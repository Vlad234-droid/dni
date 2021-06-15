import { Page } from 'features/Page';
import { ROOT_PATH } from 'config/constants';

import { PageWithIcon } from './types';

const iconsSrc: Record<PageWithIcon, string> = {
  [Page.HOME]: 'home',
  [Page.NETWORK_NEWS]: 'feedback',
  [Page.EVENTS]: 'datePicker',
  [Page.NETWORKS]: 'people',
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
  [Page.NETWORK_NEWS]: 'News',
  [Page.EVENTS]: 'Events',
  [Page.NETWORKS]: 'Networks',
  [Page.ABOUT]: 'About',
};

export const mainMenuItems = [
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
    href: window.location.pathname.includes(ROOT_PATH) ? process.env.PUBLIC_URL : '/',
    id: 'diversity-and-inclusion',
    text: 'Diversity and Inclusion',
    active: true,
  },
];

// is not actually used but is required for @beans/primary-navigation
export const mainMoreMenuItems = {
  href: '#',
  text: 'More',
};

// is not actually used but is required for @beans/primary-navigation
export const mainMenuItemMobile = {
  href: '#',
  text: 'Menu',
};

export { menuItemsDesktop, menuItemsMobile, iconsSrc };
