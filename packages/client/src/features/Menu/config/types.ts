import {
  SimpleInterpolation,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';
import { Page } from 'features/Page';

type TypeIconSrc = {
  default: string;
  active: string;
};

type TypeItem = {
  name: string;
  page: Page;
  iconSrc?: TypeIconSrc;
};

type TypeItemUpdate = {
  name: string;
  page: string;
  count: number;
  imageSrc: string;
};

type TypeItemsArray = TypeItem[];
type TypeItemsUpdateArray = TypeItemUpdate[];
type TypeMenuItemPageProperty = Page | string;
type TypeMenuItemChildren = JSX.Element | (JSX.Element | boolean)[];
type TypeIconsSrcObject = Partial<Record<Page | string, TypeIconSrc>>;
type TypeItemsObject = Record<Exclude<Page, '*'>, TypeItem>;
type TypeItemsVisibleArray = Exclude<Page, '*'>[];
type TypeItemsMobileObject = {
  visible: TypeItem[];
  hidden: TypeItem[];
};

type InterfaceCountFlexBasis = {
  amount: number;
};

interface InterfaceStylesItemsVisible {
  amount: number;
}

interface InterfaceStylesButtonMore {
  stylesActive?: FlattenInterpolation<ThemeProps<any>> | SimpleInterpolation;
}

interface InterfaceAttachStyle {
  styles: FlattenInterpolation<ThemeProps<any>> | SimpleInterpolation;
}

interface InterfaceStylesMenuItem {
  stylesActive: FlattenInterpolation<ThemeProps<any>>;
  styles: FlattenInterpolation<ThemeProps<any>> | SimpleInterpolation;
  path: string;
  to: string;
}

interface InterfacePropsMenuItem {
  stylesActive: FlattenInterpolation<ThemeProps<any>>;
  styles: FlattenInterpolation<ThemeProps<any>> | SimpleInterpolation;
  name: string;
  page: TypeMenuItemPageProperty;
  children: TypeMenuItemChildren;
}

interface InterfaceExcludeHiddenItems {
  items: TypeItemsObject;
  itemsHidden: TypeItemsObject;
  itemsVisible: TypeItemsVisibleArray;
}

type TypeExcludeHiddenItems = (args: InterfaceExcludeHiddenItems) => TypeItem[];
type TypeAttachStyle = (
  args: InterfaceAttachStyle,
) => FlattenInterpolation<ThemeProps<any>>;
type TypeCountFlexBasis = (args: InterfaceCountFlexBasis) => number;
type TypeAttachActiveStyle = (
  args: InterfaceStylesButtonMore,
) => FlattenInterpolation<ThemeProps<any>>;
type TypeRenderMenuItem = (props: InterfacePropsMenuItem) => JSX.Element;
type TypeRenderMenuDesktop = () => JSX.Element;
type TypeRenderMenuMobile = () => JSX.Element;
type TypeRenderMenuUpdates = () => JSX.Element;
type TypeAttachActiveStyleIfMatch = (
  args: InterfaceStylesMenuItem,
) => FlattenInterpolation<ThemeProps<any>> | undefined;

export type {
  TypeItemsObject,
  TypeItemsArray,
  TypeItemsUpdateArray,
  TypeItemsVisibleArray,
  TypeItemsMobileObject,
  TypeIconsSrcObject,
  TypeCountFlexBasis,
  TypeAttachStyle,
  TypeAttachActiveStyle,
  TypeAttachActiveStyleIfMatch,
  TypeExcludeHiddenItems,
  InterfaceStylesItemsVisible,
  InterfaceStylesButtonMore,
  InterfaceStylesMenuItem,
  TypeRenderMenuItem,
  TypeRenderMenuDesktop,
  TypeRenderMenuMobile,
  TypeRenderMenuUpdates,
};
