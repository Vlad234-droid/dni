import { useEffect, useState, useCallback } from 'react';

import { ViewportSize } from 'config/constants';
import createMediaListener from 'utils/createMediaListener';

const media = createMediaListener({
  isMobile: `(min-width: ${ViewportSize.PHONE}px) and (max-width: ${
    ViewportSize.TABLET - 1
  }px)`,
  isTablet: `(min-width: ${ViewportSize.TABLET}px) and (max-width: ${
    ViewportSize.SMALL_DESKTOP - 1
  }px)`,
  isDesktop: `(min-width: ${ViewportSize.SMALL_DESKTOP}px)`,
});

type Media = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const useMedia = () => {
  const [viewport, setViewport] = useState<ViewportSize>(ViewportSize.PHONE);

  const calculateViewport = useCallback((media: Media) => {
    const { isMobile, isTablet, isDesktop } = media;
    switch (true) {
      case isMobile:
        setViewport(ViewportSize.PHONE);
        return;
      case isTablet:
        setViewport(ViewportSize.TABLET);
        return;
      case true:
      case isDesktop:
        setViewport(ViewportSize.SMALL_DESKTOP);
        return;
      default:
        setViewport(ViewportSize.PHONE);
    }
  }, []);
  useEffect(() => {
    calculateViewport(media.getState() as Media);
    media.listen((media) => calculateViewport({ ...media } as Media));
    return media.dispose;
  }, []);

  return viewport;
};

export default useMedia;
