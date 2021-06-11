import { useEffect, useState, useCallback } from 'react';

import { ViewportSize } from 'config/constants';
import createMediaListener from 'utils/createMediaListener';

type Media = {
  isMobile: string;
  isLargeMobile: string;
  isTablet: string;
  isDesktop: string;
};

const MediaQueries: Media = {
  isMobile: `(min-width: ${ViewportSize.PHONE}px) and (max-width: ${ViewportSize.LARGE_PHONE - 1}px)`,
  isLargeMobile: `(min-width: ${ViewportSize.LARGE_PHONE}px) and (max-width: ${ViewportSize.TABLET - 1}px)`,
  isTablet: `(min-width: ${ViewportSize.TABLET}px) and (max-width: ${ViewportSize.SMALL_DESKTOP - 1}px)`,
  isDesktop: `(min-width: ${ViewportSize.SMALL_DESKTOP}px)`,
};

const media = createMediaListener(MediaQueries);

const useMedia = () => {
  const [viewport, setViewport] = useState<ViewportSize>(ViewportSize.PHONE);

  const calculateViewport = useCallback((media) => {
    const { isMobile, isLargeMobile, isTablet, isDesktop } = media;
    switch (true) {
      case isMobile:
        setViewport(ViewportSize.PHONE);
        return;
      case isLargeMobile:
        setViewport(ViewportSize.LARGE_PHONE);
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
    calculateViewport(media.getState());
    media.listen((media) => calculateViewport({ ...media }));
    return media.dispose;
  }, []);

  return viewport;
};

export default useMedia;
