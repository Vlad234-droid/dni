import { css } from 'styled-components';
import {
  countFlexBasis,
  attachStyle,
  attachActiveStyle,
  attachActiveStyleIfMatch,
  excludeHiddenItems,
} from './index';
import { items, itemsHidden, itemsVisible, itemsMobile } from '../config/items';

// TODO: need update this test
describe('Menu feature utils', () => {
  describe('countFlexBasis', () => {
    it('should return 25', () => {
      const result = countFlexBasis({ amount: 3 });
      const expected = 25;

      expect(result).toEqual(expected);
    });
  });

  describe('attachStyle', () => {
    it('should return styles string', () => {
      const result = attachStyle({ styles: 'display: flex;' });
      const expected = css`
        display: flex;
      `;

      expect(result).toEqual(expected);
    });
  });

  describe('attachActiveStyle', () => {
    it('should return styles string', () => {
      const result = attachActiveStyle({ stylesActive: 'display: grid;' });
      const expected = css`
        display: grid;
      `;

      expect(result).toEqual(expected);
    });
  });

  describe('attachActiveStyleIfMatch', () => {
    it('should return false if no match', () => {
      const result = attachActiveStyleIfMatch({
        path: '/',
        to: '/some-page',
        styles: css`
          display: block;
        `,
        stylesActive: css`
          color: red;
        `,
      });
      const expected = false;

      expect(result).toEqual(expected);
    });

    it('should return a correct styles string if match', () => {
      const result = attachActiveStyleIfMatch({
        path: '/some-page',
        to: '/some-page',
        styles: css`
          display: block;
        `,
        stylesActive: css`
          color: green;
        `,
      });
      const expected = css`
        color: green;
      `;

      expect(result).toEqual(expected);
    });
  });

  describe('excludeHiddenItems', () => {
    it('should exclude hidden items and build visible items', () => {
      const result = excludeHiddenItems({
        items,
        itemsHidden,
        itemsVisible,
      });
      const expected = itemsMobile.visible;

      expect(result).toEqual(expected);
    });
  });
});
