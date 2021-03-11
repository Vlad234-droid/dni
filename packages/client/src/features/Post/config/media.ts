import iconAddFile from '../assets/icon-add-file.svg';
import iconAddPhoto from '../assets/icon-add-photo.svg';
import iconArchive from '../assets/icon-archive.svg';
import iconUnarchive from '../assets/icon-unarchive.svg';
import iconCopy from '../assets/icon-copy.svg';
import iconDelete from '../assets/icon-delete.svg';
import iconEdit from '../assets/icon-edit.svg';
import iconLike from '../assets/icon-like.svg';
import iconLikePressed from '../assets/icon-like-pressed.svg';
import iconFileError from '../assets/icon-file-error.svg';
import iconFileLoad from '../assets/icon-file-load.svg';
import iconFilePDF from '../assets/icon-file-pdf.svg';
import iconFilePlus from '../assets/icon-file-plus.svg';
import iconSelectArrow from '../assets/icon-select-arrow.svg';
import iconEmojiHeart from '../assets/icon-emoji-heart.png';
import iconEmojiLaugh from '../assets/icon-emoji-laugh.png';
import iconEmojiLike from '../assets/icon-emoji-like.png';
import iconEmojiSmile from '../assets/icon-emoji-smile.png';
import iconEmojiSurprise from '../assets/icon-emoji-surprise.png';
import backgroundDropZone from '../assets/background-drop-zone.jpg';

import imageAvatar from '../assets/image-avatar.png';
import imagePhoto1 from '../assets/image-photo-1.png';
import imagePhoto2 from '../assets/image-photo-2.png';

const iconsSrc: Record<string, string> = {
  addFile: iconAddFile,
  addImage: iconAddPhoto,
  archive: iconArchive,
  unarchive: iconUnarchive,
  copy: iconCopy,
  delete: iconDelete,
  edit: iconEdit,
  like: iconLike,
  likePressed: iconLikePressed,
  fileError: iconFileError,
  filePDF: iconFilePDF,
  fileLoad: iconFileLoad,
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
  dropZone: backgroundDropZone,
};

export { iconsSrc, imagesSrc };
