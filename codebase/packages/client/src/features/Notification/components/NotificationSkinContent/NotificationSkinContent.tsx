import React, { FC } from 'react';

import { SkinContentProps } from '../../config/types';

const PostCreated: FC<SkinContentProps> = () => <div>{'post created'}</div>;

const PostUpdated: FC<SkinContentProps> = () => <div>{'post updated'}</div>;

const PostUrchived: FC<SkinContentProps> = () => <div>{'post urchived'}</div>;

const PostRemoved: FC<SkinContentProps> = () => <div>{'post removed'}</div>;

const EventCreated: FC<SkinContentProps> = () => <div>{'event created'}</div>;

const EventUpdated: FC<SkinContentProps> = () => <div>{'event updated'}</div>;

const EventUrchived: FC<SkinContentProps> = () => <div>{'event urchived'}</div>;

const EventRemoved: FC<SkinContentProps> = () => <div>{'event removed'}</div>;

const NetworkCreated: FC<SkinContentProps> = () => <div>{'network created'}</div>;

const NetworkUpdated: FC<SkinContentProps> = () => <div>{'network updated'}</div>;

const NetworkUrchived: FC<SkinContentProps> = () => <div>{'network urchived'}</div>;

const NetworkRemoved: FC<SkinContentProps> = () => <div>{'network removed'}</div>;

export {
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
};
