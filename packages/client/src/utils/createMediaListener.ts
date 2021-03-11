import { isBrowser } from './browser';

type Media = Record<string, string>;
type QueryList = Record<string, MediaQueryList>;
// TODO should specify type
type MediaState = Record<string, boolean>;
type Listener = (this: MediaQueryList, ev: MediaQueryListEvent) => void;
type TransientListener = (arg: MediaState) => void;

interface CreateMediaListener {
  getState: () => MediaState;
  listen: (listener: TransientListener) => void;
  dispose: () => void;
}

const createMediaListener = (media: Media) => {
  let transientListener: TransientListener | null = null;

  const mediaKeys = Object.keys(media);

  const queryLists: QueryList = mediaKeys.reduce(
    (queries, key) => ({
      ...queries,
      [key]: window.matchMedia(media[key]),
    }),
    {},
  );

  const mediaState: MediaState = mediaKeys.reduce(
    (state, key) => ({
      ...state,
      [key]: queryLists[key].matches,
    }),
    {},
  );

  const notify = () => {
    if (transientListener) {
      transientListener(mediaState);
    }
  };

  const mutateMediaState = (key: string, val: boolean) => {
    mediaState[key] = val;
    notify();
  };

  const listeners: Record<string, Listener> = mediaKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: (event: { matches: boolean }) =>
        mutateMediaState(key, event.matches),
    }),
    {},
  );

  const listen = (listener: TransientListener) => {
    transientListener = listener;
    mediaKeys.forEach((key) => {
      queryLists[key].addEventListener('change', listeners[key]);
    });
  };

  const dispose = () => {
    transientListener = null;
    mediaKeys.forEach((key) => {
      queryLists[key].removeEventListener('change', listeners[key]);
    });
  };

  const getState = () => mediaState;

  return { listen, dispose, getState };
};

export default (media: Media): CreateMediaListener => {
  if (!isBrowser || process.env.NODE_ENV === 'test') {
    return {
      getState: () => ({}),
      listen: () => undefined,
      dispose: () => undefined,
    };
  }
  return createMediaListener(media);
};
