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

export interface MenuItem {
  name: string;
  page: Page;
  iconSrc?: IconSrc;
}

export type MenuUpdatesItem = {
  name: string;
  page: string;
  count: number;
  imageSrc: string;
};

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

export type { AttachStyle, StylesItemsVisible, StylesButtonMore };
