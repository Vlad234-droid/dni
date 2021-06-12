import { FC } from 'react';

import { ActionType, SkinContentProps } from './types';
import {
  PostCreated,
  PostUpdated,
  PostUrchived,
  PostRemoved,
  EventCreated,
  EventUpdated,
  EventUrchived,
  EventRemoved,
  NetworkCreated,
  NetworkUpdated,
  NetworkUrchived,
  NetworkRemoved,
} from '../components/NotificationSkinContent';

const skins: Partial<
  {
    [key in ActionType]: Partial<{
      title: string;
      Content: FC<SkinContentProps>;
    }>;
  }
> = {
  [ActionType.POST_CREATED]: {
    title: 'Hello, World!',
    Content: PostCreated,
  },
  [ActionType.POST_UPDATED]: {
    title: 'Hello, World!',
    Content: PostUpdated,
  },
  [ActionType.POST_ARCHIVED]: {
    title: 'Hello, World!',
    Content: PostUrchived,
  },
  [ActionType.POST_REMOVED]: {
    title: 'Hello, World!',
    Content: PostRemoved,
  },

  [ActionType.EVENT_CREATED]: {
    title: 'Hello, World!',
    Content: EventCreated,
  },
  [ActionType.EVENT_UPDATED]: {
    title: 'Hello, World!',
    Content: EventUpdated,
  },
  [ActionType.EVENT_ARCHIVED]: {
    title: 'Hello, World!',
    Content: EventUrchived,
  },
  [ActionType.EVENT_REMOVED]: {
    title: 'Hello, World!',
    Content: EventRemoved,
  },

  [ActionType.NETWORK_CREATED]: {
    title: 'Hello, World!',
    Content: NetworkCreated,
  },
  [ActionType.NETWORK_UPDATED]: {
    title: 'Hello, World!',
    Content: NetworkUpdated,
  },
  [ActionType.NETWORK_ARCHIVED]: {
    title: 'Hello, World!',
    Content: NetworkUrchived,
  },
  [ActionType.NETWORK_REMOVED]: {
    title: 'Hello, World!',
    Content: NetworkRemoved,
  },
};

export { skins };
