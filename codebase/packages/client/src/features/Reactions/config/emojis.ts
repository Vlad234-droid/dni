import { ReactionType, EmojiIcon } from './types';
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
    type: ReactionType.LIKE,
    icon: {
      active: iconLikeActive,
      default: iconLikeDefault,
    } as EmojiIcon,
  },
  {
    type: ReactionType.HEART,
    icon: {
      active: iconHeartActive,
      default: iconHeartDefault,
    } as EmojiIcon,
  },
  {
    type: ReactionType.SMILE,
    icon: {
      active: iconSmileActive,
      default: iconSmileDefault,
    } as EmojiIcon,
  },
  {
    type: ReactionType.LAUGH,
    icon: {
      active: iconLaughActive,
      default: iconLaughDefault,
    } as EmojiIcon,
  },
  {
    type: ReactionType.SURPRISE,
    icon: {
      active: iconSurpriseActive,
      default: iconSurpriseDefault,
    } as EmojiIcon,
  },
];
