import { isBrowser } from './browser';

type Media<T extends string | number | symbol> = Record<T, string>;
type QueryList<T extends string | number | symbol> = Record<T, MediaQueryList>;
type MediaState<T extends string | number | symbol> = Record<T, boolean>;
type Listener = (this: MediaQueryList, ev: MediaQueryListEvent) => void;
type TransientListener<T extends string | number | symbol> = (
  arg: MediaState<T>,
) => void;

interface CreateMediaListener<K extends string | number | symbol> {
  getState: () => MediaState<K>;
  listen: (listener: TransientListener<K>) => void;
  dispose: () => void;
}

const createMediaListener = <O extends object, K extends keyof O>(
  media: Media<K>,
) => {
  let transientListener: TransientListener<K> | null = null;

  const mediaKeys = Object.keys(media) as Array<K>;

  const queryLists = mediaKeys.reduce(
    (queries: QueryList<K>, key) => ({
      ...queries,
      [key]: window.matchMedia(media[key]),
    }),
    {} as QueryList<K>,
  );

  const mediaState = mediaKeys.reduce(
    (state: MediaState<K>, key) => ({
      ...state,
      [key]: queryLists[key].matches,
    }),
    {} as MediaState<K>,
  );

  const notify = () => {
    if (transientListener) {
      transientListener(mediaState);
    }
  };

  // @ts-ignore
  const mutateMediaState = (key: K, val) => {
    mediaState[key] = val;
    notify();
  };

  const listeners: Record<K, Listener> = mediaKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: (event: { matches: boolean }) =>
        mutateMediaState(key, event.matches),
    }),
    {} as Record<K, Listener>,
  );

  const listen = (listener: TransientListener<K>) => {
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

export default <O extends object, K extends keyof O>(
  media: Media<K>,
): CreateMediaListener<K> => {
  if (!isBrowser || process.env.NODE_ENV === 'test') {
    return {
      getState: () => ({} as MediaState<K>),
      listen: () => undefined,
      dispose: () => undefined,
    };
  }
  // @ts-ignore
  return createMediaListener(media);
};
