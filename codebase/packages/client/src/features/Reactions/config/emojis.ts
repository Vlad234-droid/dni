import { ReactionType as Variant } from './types';
import iconLikeActive from '../assets/icon-like-active.svg';
import iconLikeDefault from '../assets/icon-like-default.svg';
import iconHeartActive from '../assets/icon-heart-active.svg';
import iconHeartDefault from '../assets/icon-heart-default.svg';
import iconSmileActive from '../assets/icon-smile-active.svg';
import iconSmileDefault from '../assets/icon-smile-default.svg';
import iconLaughActive from '../assets/icon-laugh-active.svg';
import iconLaughDefault from '../assets/icon-laugh-default.svg';
import iconSurpriseActive from '../assets/icon-surprise-active.svg';
import iconSurpriseDefault from '../assets/icon-surprise-default.svg';

export default [
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
