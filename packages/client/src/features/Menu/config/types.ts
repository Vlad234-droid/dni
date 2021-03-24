import {
  SimpleInterpolation,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';
import { Page } from 'features/Page';

export type IconSrc = {
  default: string;
  active: string;
};

export type MenuItem = string;

export type VisiblePages = Exclude<Page, Page.ADD_NETWORKS | Page.NOT_FOUND>;

interface StylesItemsVisible {
  amount: number;
}

interface StylesButtonMore {
  stylesActive?: FlattenInterpolation<ThemeProps<any>> | SimpleInterpolation;
}

interface AttachStyle {
  styles: FlattenInterpolation<ThemeProps<any>> | SimpleInterpolation;
}

type PageWithIcon = Page.EVENTS | Page.NETWORKS | Page.NEWS_FEED;

export type { AttachStyle, StylesItemsVisible, StylesButtonMore, PageWithIcon };
