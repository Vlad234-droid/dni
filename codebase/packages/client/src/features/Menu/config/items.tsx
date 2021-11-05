import { OURTESCO_URL, PUBLIC_URL } from 'config/constants';
import { Page } from 'features/Page';

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
  [Page.EMAIL_CONFIRMATION]: 'Email confirmation',
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
    href: `${OURTESCO_URL}/colleague`,
    id: 'home',
    text: 'Home',
  },
  {
    href: `${OURTESCO_URL}/colleague/news`,
    id: 'news-and-views',
    text: 'News & Views',
  },
  {
    href: `${OURTESCO_URL}/reward-and-benefits`,
    id: 'reward-and-benefits',
    text: 'Reward & Benefits',
  },
  {
    href: `${OURTESCO_URL}/colleague/working-at-tesco`,
    id: 'working-at-tesco',
    text: 'Working at Tesco',
  },
  {
    href: `${OURTESCO_URL}/colleague/our-community`,
    id: 'our-community',
    text: 'Our Community',
  },
  {
    href: `${OURTESCO_URL}/colleague/health-and-wellbeing`,
    id: 'health-and-wellbeing',
    text: 'Health and Wellbeing',
  },
  {
    href: `${PUBLIC_URL}`,
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
