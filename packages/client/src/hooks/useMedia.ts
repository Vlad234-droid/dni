import { useEffect, useState, useCallback } from 'react';

import { ViewportSize } from 'config/constants';
import createMediaListener from 'utils/createMediaListener';

type Media = {
  isMobile: string;
  isTablet: string;
  isDesktop: string;
};

const MediaQueries: Media = {
  isMobile: `(min-width: ${ViewportSize.PHONE}px) and (max-width: ${
    ViewportSize.TABLET - 1
  }px)`,
  isTablet: `(min-width: ${ViewportSize.TABLET}px) and (max-width: ${
    ViewportSize.SMALL_DESKTOP - 1
  }px)`,
<<<<<<< HEAD
  isDesktop: `(min-width: ${ViewportSize.SMALL_DESKTOP}px)`,
});

type Media = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
=======
  isDesktop: `(min-width: ${ViewportSize.DESKTOP}px)`,
>>>>>>> feat(client): TESCO-486 add create event page
};

const media = createMediaListener(MediaQueries);

const useMedia = () => {
  const [viewport, setViewport] = useState<ViewportSize>(ViewportSize.PHONE);

<<<<<<< HEAD
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
=======
  const calculateViewport = useCallback(
    (media: Record<keyof Media, boolean>) => {
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
          setViewport(ViewportSize.DESKTOP);
          return;
        default:
          setViewport(ViewportSize.PHONE);
      }
    },
    [],
  );
>>>>>>> feat(client): TESCO-486 add create event page
  useEffect(() => {
    calculateViewport(media.getState());
    media.listen((media) => calculateViewport({ ...media }));
    return media.dispose;
  }, []);

  return viewport;
};

export default useMedia;
