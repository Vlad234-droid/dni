import { Page } from 'features/Page';
import {
  TypeItemsArray,
  TypeItemsObject,
  TypeItemsUpdateArray,
  TypeItemsVisibleArray,
  TypeItemsMobileObject,
  TypeIconsSrcObject,
} from './types';
import { excludeHiddenItems } from '../utils';

import imageUpdate0 from '../assets/image-update-0.png';
import imageUpdate1 from '../assets/image-update-1.png';
import imageUpdate2 from '../assets/image-update-2.png';
import imageUpdate3 from '../assets/image-update-3.png';
import imageUpdate4 from '../assets/image-update-4.png';

import iconEvents from '../assets/icon-events.svg';
import iconEventsInv from '../assets/icon-events-inv.svg';
import iconMore from '../assets/icon-more.svg';
import iconMoreInv from '../assets/icon-more-inv.svg';
import iconNetworks from '../assets/icon-networks.svg';
import iconNetworksInv from '../assets/icon-networks-inv.svg';
import iconNewsFeed from '../assets/icon-news-feed.svg';
import iconNewsFeedInv from '../assets/icon-news-feed-inv.svg';

const iconsSrc: TypeIconsSrcObject = {
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
  buttonMore: {
    default: iconMore,
    active: iconMoreInv,
  },
};

const items: TypeItemsObject = {
  [Page.NEWS_FEED]: {
    name: 'News feed',
    page: Page.NEWS_FEED,
    iconSrc: iconsSrc[Page.NEWS_FEED],
  },
  [Page.EVENTS]: {
    name: 'Events',
    page: Page.EVENTS,
    iconSrc: iconsSrc[Page.EVENTS],
  },
  [Page.NETWORKS]: {
    name: 'Networks',
    page: Page.NETWORKS,
    iconSrc: iconsSrc[Page.NETWORKS],
  },
  [Page.DASHBOARD]: {
    name: 'Dashboard',
    page: Page.DASHBOARD,
  },
  [Page.PROFILE]: {
    name: 'Profile',
    page: Page.PROFILE,
  },
  [Page.REPORTS]: {
    name: 'Reports',
    page: Page.REPORTS,
  },
  [Page.SURVEYS]: {
    name: 'Surveys',
    page: Page.SURVEYS,
  },
  [Page.USERS]: {
    name: 'Users',
    page: Page.USERS,
  },
  [Page.ABOUT]: {
    name: 'About',
    page: Page.ABOUT,
  },
};

const itemsUpdates: TypeItemsUpdateArray = [
  {
    imageSrc: imageUpdate0,
    name: 'BAME at Tesco',
    page: `${Page.NETWORKS}/bame`,
    count: 1,
  },
  {
    imageSrc: imageUpdate1,
    name: 'LGBTQ+',
    page: `${Page.NETWORKS}/lgbt`,
    count: 2,
  },
  {
    imageSrc: imageUpdate2,
    name: 'Armed forces at Tesco',
    page: `${Page.NETWORKS}/armed-forces`,
    count: 4,
  },
  {
    imageSrc: imageUpdate3,
    name: 'Disability at Tesco',
    page: `${Page.NETWORKS}/disability`,
    count: 10,
  },
  {
    imageSrc: imageUpdate4,
    name: 'Women at Tesco',
    page: `${Page.NETWORKS}/women`,
    count: 7,
  },
];

const itemsDesktop: TypeItemsArray = Object.values(items);
const itemsHidden: TypeItemsObject = { ...items };
const itemsVisible: TypeItemsVisibleArray = [
  Page.NEWS_FEED,
  Page.EVENTS,
  Page.NETWORKS,
];

const itemsMobile: TypeItemsMobileObject = {
  visible: excludeHiddenItems({
    items,
    itemsHidden,
    itemsVisible,
  }),
  hidden: Object.values(itemsHidden),
};

const itemButtonMore = {
  name: 'More',
  iconSrc: iconsSrc.buttonMore,
};

export {
  items,
  itemsHidden,
  itemsVisible,
  itemsDesktop,
  itemsMobile,
  itemButtonMore,
  itemsUpdates,
};
