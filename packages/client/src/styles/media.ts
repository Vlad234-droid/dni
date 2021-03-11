import {
  css,
  SimpleInterpolation,
  FlattenSimpleInterpolation,
} from 'styled-components';

import { ViewportSize } from '../config/constants';

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

export type Viewport = 'phone' | 'tablet' | 'desktop';

const Media: { [viewport in Viewport]: MediaFn } = {
  desktop: generateMedia(ViewportSize.DESKTOP),
  tablet: generateMedia(ViewportSize.TABLET),
  phone: generateMedia(ViewportSize.PHONE),
};

export default Media;
