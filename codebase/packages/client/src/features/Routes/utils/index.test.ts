import { Page, pages } from 'features/Page';

import { buildPath, buildRoute } from './index';

describe('Routes utils', () => {
  describe('buildPath', () => {
    it('should return About path', () => {
      const result = buildPath(Page.ABOUT);
      const expected = '/';

      expect(result).toEqual(expected);
    });

    it('should return another Page path', () => {
      const result = buildPath(Page.EVENTS);
      const expected = Page.EVENTS;

      expect(result).toEqual(expected);
    });
  });

  describe('buildRoute', () => {
    it('should return a route', () => {
      const expected = {
        path: Page.EVENTS,
        exact: true,
        page: 'events',
        Component: pages[Page.EVENTS],
      };
      const result = buildRoute(Page.EVENTS);

      expect(result).toEqual(expected);
    });
  });
});
