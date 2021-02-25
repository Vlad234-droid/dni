import iconAddFile from '../assets/icon-add-file.svg';
import iconAddPhoto from '../assets/icon-add-photo.svg';
import iconBook from '../assets/icon-book.svg';
import iconCopy from '../assets/icon-copy.svg';
import iconArchive from '../assets/icon-archive.svg';
import iconUnArchive from '../assets/icon-unarchive.svg';
import iconEdit from '../assets/icon-edit.svg';
import iconLike from '../assets/icon-like.svg';
import iconFileError from '../assets/icon-file-error.svg';
import iconFilePDF from '../assets/icon-file-pdf.svg';
import iconFilePhoto from '../assets/icon-file-photo.svg';
import iconFilePlus from '../assets/icon-file-plus.svg';
import iconSelectArrow from '../assets/icon-select-arrow.svg';
import iconEmojiHeart from '../assets/icon-emoji-heart.png';
import iconEmojiLaugh from '../assets/icon-emoji-laugh.png';
import iconEmojiLike from '../assets/icon-emoji-like.png';
import iconEmojiSmile from '../assets/icon-emoji-smile.png';
import iconEmojiSurprise from '../assets/icon-emoji-surprise.png';

import imageAvatar from '../assets/image-avatar.png';
import imagePhoto1 from '../assets/image-photo-1.png';
import imagePhoto2 from '../assets/image-photo-2.png';

const iconsSrc: Record<string, string> = {
  addFile: iconAddFile,
  addPhoto: iconAddPhoto,
  book: iconBook,
  copy: iconCopy,
  archive: iconArchive,
  unarchive: iconUnArchive,
  edit: iconEdit,
  like: iconLike,
  fileError: iconFileError,
  filePDF: iconFilePDF,
  filePhoto: iconFilePhoto,
  filePlus: iconFilePlus,
  selectArrow: iconSelectArrow,
  emojiHeart: iconEmojiHeart,
  emojiLaugh: iconEmojiLaugh,
  emojiLike: iconEmojiLike,
  emojiSmile: iconEmojiSmile,
  emojiSurprise: iconEmojiSurprise,
};

const imagesSrc: Record<string, string> = {
  avatar: imageAvatar,
  photo1: imagePhoto1,
  photo2: imagePhoto2,
};

const emotionsList = [
  {
    image: iconsSrc.emojiLike,
    name: 'like',
    count: 1,
  },
  {
    image: iconsSrc.emojiHeart,
    name: 'heart',
    count: 1,
  },
  {
    image: iconsSrc.emojiSmile,
    name: 'smile',
    count: 1,
  },
  {
    image: iconsSrc.emojiLaugh,
    name: 'laugh',
    count: 1,
  },
  {
    image: iconsSrc.emojiSurprise,
    name: 'surprise',
    count: 1,
  },
];

export { iconsSrc, imagesSrc, emotionsList };
