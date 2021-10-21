import { BaseApiParams } from '../types';

export enum ReactionType {
  LIKE = 'like',
  HEART = 'heart',
  LAUGH = 'laugh',
  SMILE = 'smile',
  SURPRISE = 'surprise',
}

export enum ContentType {
  POST = 'application::post.post',
  EVENT = 'application::event.event',
}

export type Reaction = {
  id: number;
  type: ReactionType;
  author: {
    id: number;
    username: string;
    email: string;
  };
  parent: {
    id: number;
    relatedType: ContentType;
    relatedId: number;
  };
};

export type Reactions = {
  [key in keyof ReactionType]: Reaction[];
};

export type ReactionApiParams = {
  authorQuery?: string;
  authorField?: 'external_id';
  reactionId?: string;
  reactionType?: string;
  reaction?: string;
  relatedType?: string;
  parentId?: string;
  contentType?: string;
} & BaseApiParams;

export type ReactionBody = {
  type: ReactionType;
  parent: {
    relatedId: string | number;
    relatedType: ContentType;
  };
  externalAuthor: {
    name: string;
    email: string;
    externalId: string;
  };
};

export type ReactionsCount = {
  [key in keyof ReactionType]: number;
};

export default Reaction;
