import { getPageByPath, isHiddenItemActive, getMoreButtonText } from './index';

describe('#Menu utils', () => {
  describe('getPageByPath', () => {
    it('should return page from path', () => {
      expect(getPageByPath('/')).toBe('');
      expect(getPageByPath('/networks')).toBe('networks');
    });
  });

  describe('isHiddenItemActive', () => {
    it('should return true, if page from path is in hidden items', () => {
      expect(isHiddenItemActive('/')).toBe(true);
      expect(isHiddenItemActive('/reports')).toBe(true);
    });

    it('should return false, if page from is not in hidden items', () => {
      expect(isHiddenItemActive('/networks')).toBe(false);
      expect(isHiddenItemActive('/events')).toBe(false);
    });
  });

  describe('getMoreButtonText', () => {
    it('should return More, if hidden item is not active', () => {
      expect(getMoreButtonText('/networks')).toBe('More');
      expect(getMoreButtonText('/events')).toBe('More');
    });

    it('should return page name, if page is in hidden and is active', () => {
      expect(getMoreButtonText('/')).toBe('About');
      expect(getMoreButtonText('/reports')).toBe('Reports');
    });
  });
});
