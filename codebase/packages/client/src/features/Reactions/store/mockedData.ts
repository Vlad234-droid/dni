import iconHeartActive from '../assets/icon-heart-active.svg';
import iconHeartDefault from '../assets/icon-heart-default.svg';
import iconLaughActive from '../assets/icon-laugh-active.svg';
import iconLaughDefault from '../assets/icon-laugh-default.svg';
import iconLikeActive from '../assets/icon-like-active.svg';
import iconLikeDefault from '../assets/icon-like-default.svg';
import iconSmileActive from '../assets/icon-smile-active.svg';
import iconSmileDefault from '../assets/icon-smile-default.svg';
import iconSurpriseActive from '../assets/icon-surprise-active.svg';
import iconSurpriseDefault from '../assets/icon-surprise-default.svg';

import { Variant } from '../config/types';

export const reactions = [
  {
    id: 159,
    entityType: 'post',
    reactions: [Variant.SMILE, Variant.SURPRISE],
    reactionsCount: {
      [Variant.SMILE]: 5,
      [Variant.HEART]: 10,
      [Variant.LAUGH]: 15,
      [Variant.LIKE]: 0,
      [Variant.SURPRISE]: 1678,
    },
  },
  {
    id: 82,
    entityType: 'post',
    reactions: [Variant.LAUGH],
    reactionsCount: {
      [Variant.SMILE]: 35,
      [Variant.HEART]: 0,
      [Variant.LAUGH]: 135,
      [Variant.LIKE]: 20,
      [Variant.SURPRISE]: 138,
    },
  },
  {
    id: 76,
    entityType: 'post',
    reactions: [Variant.HEART, Variant.LIKE],
    reactionsCount: {
      [Variant.SMILE]: 335,
      [Variant.HEART]: 102,
      [Variant.LAUGH]: 15,
      [Variant.LIKE]: 230,
      [Variant.SURPRISE]: 38,
    },
  },
  {
    id: 158,
    entityType: 'post',
    reactions: [Variant.LAUGH],
    reactionsCount: {
      [Variant.SMILE]: 35,
      [Variant.HEART]: 0,
      [Variant.LAUGH]: 135,
      [Variant.LIKE]: 20,
      [Variant.SURPRISE]: 138,
    },
  },
  {
    id: 157,
    entityType: 'post',
    reactions: [Variant.LAUGH],
    reactionsCount: {
      [Variant.SMILE]: 35,
      [Variant.HEART]: 0,
      [Variant.LAUGH]: 135,
      [Variant.LIKE]: 20,
      [Variant.SURPRISE]: 138,
    },
  },
  {
    id: 156,
    entityType: 'post',
    reactions: [Variant.LAUGH],
    reactionsCount: {
      [Variant.SMILE]: 35,
      [Variant.HEART]: 0,
      [Variant.LAUGH]: 135,
      [Variant.LIKE]: 20,
      [Variant.SURPRISE]: 138,
    },
  },
  {
    id: 154,
    entityType: 'post',
    reactions: [Variant.LAUGH],
    reactionsCount: {
      [Variant.SMILE]: 35,
      [Variant.HEART]: 0,
      [Variant.LAUGH]: 135,
      [Variant.LIKE]: 20,
      [Variant.SURPRISE]: 138,
    },
  },
  {
    id: 143,
    entityType: 'post',
    reactions: [Variant.LAUGH],
    reactionsCount: {
      [Variant.SMILE]: 35,
      [Variant.HEART]: 0,
      [Variant.LAUGH]: 135,
      [Variant.LIKE]: 20,
      [Variant.SURPRISE]: 138,
    },
  },
  {
    id: 141,
    entityType: 'post',
    reactions: [Variant.LAUGH],
    reactionsCount: {
      [Variant.SMILE]: 35,
      [Variant.HEART]: 0,
      [Variant.LAUGH]: 135,
      [Variant.LIKE]: 20,
      [Variant.SURPRISE]: 138,
    },
  },
  {
    id: 79,
    entityType: 'post',
    reactions: [Variant.LAUGH],
    reactionsCount: {
      [Variant.SMILE]: 35,
      [Variant.HEART]: 0,
      [Variant.LAUGH]: 135,
      [Variant.LIKE]: 20,
      [Variant.SURPRISE]: 138,
    },
  },
  {
    id: 77,
    entityType: 'post',
    reactions: [Variant.LAUGH],
    reactionsCount: {
      [Variant.SMILE]: 35,
      [Variant.HEART]: 0,
      [Variant.LAUGH]: 135,
      [Variant.LIKE]: 20,
      [Variant.SURPRISE]: 138,
    },
  },
];

export const emojis = [
  {
    type: Variant.LIKE,
    icon: {
      active: iconLikeActive,
      default: iconLikeDefault,
    },
  },
  {
    type: Variant.HEART,
    icon: {
      active: iconHeartActive,
      default: iconHeartDefault,
    },
  },
  {
    type: Variant.SMILE,
    icon: {
      active: iconSmileActive,
      default: iconSmileDefault,
    },
  },
  {
    type: Variant.LAUGH,
    icon: {
      active: iconLaughActive,
      default: iconLaughDefault,
    },
  },
  {
    type: Variant.SURPRISE,
    icon: {
      active: iconSurpriseActive,
      default: iconSurpriseDefault,
    },
  },
];
