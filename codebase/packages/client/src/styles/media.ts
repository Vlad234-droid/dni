import {
  css,
  SimpleInterpolation,
  FlattenSimpleInterpolation,
} from 'styled-components';

import { ViewportSize } from 'config/constants';

type MediaFn = (
  strings: TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
) => FlattenSimpleInterpolation;

const generateMedia = (size: number) => (
  strings: TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
) =>
  css`
    @media only screen and (min-width: ${size}px) {
      ${css(strings, ...interpolations)};
    }
  `;

export type Viewport =
  | 'phone'
  | 'large_phone'
  | 'tablet'
  | 'large_tablet'
  | 'small_desktop'
  | 'desktop'
  | 'large_desktop';

const Media: { [viewport in Viewport]: MediaFn } = {
  phone: generateMedia(ViewportSize.PHONE),
  large_phone: generateMedia(ViewportSize.LARGE_PHONE),
  tablet: generateMedia(ViewportSize.TABLET),
  large_tablet: generateMedia(ViewportSize.LARGE_TABLET),
  small_desktop: generateMedia(ViewportSize.SMALL_DESKTOP),
  desktop: generateMedia(ViewportSize.DESKTOP),
  large_desktop: generateMedia(ViewportSize.LARGE_DESKTOP),
};

export default Media;
