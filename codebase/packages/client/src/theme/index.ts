import { defaultTheme } from '@beans/theme';
import merge from 'lodash.merge';

import graphics from './graphics';

export default merge(defaultTheme, {
  colors: {
    background: {
      dark: '#F2F6FA', // override
      darkest: '#D9E5F1', // override
      success: '#D5FBD2', // override
    },
    lines: {
      disabled: '#E5E5E5', // new
    },
    link: {
      hover: '#00294F', // new
    },
    tost: '#F2F6FA', // new
    success: '#69B24A', // override from Tesco secondary colors
  },
  fontSize: {
    xxxxl: '44px',
  },
  icons: {
    graphics,
  },
});
