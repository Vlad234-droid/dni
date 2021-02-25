import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

enum TypePostStatus {
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  CREATING = '',
}

enum TypeFileStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type TypeUser = {
  name: string;
  avatarSrc: string;
};

type TypeFile = {
  type: string;
  name: string;
  path: string;
  status: TypeFileStatus;
  progress: number;
};

type TypeEmoji = {
  image: string;
  count: number;
  name: string;
};

type TypeEmotion = {
  id: number;
  post: TypePost;
  count: number;
  image: File;
};

type TypePost = {
  id: number;
  slug: string;
  title: string;
  postAs: string;
  status: TypePostStatus;
  attachments: TypeFile[];
  description: string;
  sharedToken: string;
  emotions: TypeEmoji[];
  createdBy: TypeUser | null;
  createdAt: string;
  updatedAt: string;
};

type TypeOnFileDelete = (file: TypeFile) => void;

interface InterfacePropsPostFilesView {
  files: TypeFile[];
}

type TypeRenderPostFilesView = (
  props: InterfacePropsPostFilesView,
) => JSX.Element;

interface InterfacePropsPostFilesCreate extends InterfacePropsPostFilesView {
  onFileDelete: TypeOnFileDelete;
}

type TypeRenderPostFilesCreate = (
  props: InterfacePropsPostFilesCreate,
) => JSX.Element;

interface InterfacePropsPostCustomSelect {
  onMenuToggle: () => void;
  onOptionPick: (publisher: TypeUser) => void;
}

type TypeRenderCustomSelect = (
  props: InterfacePropsPostCustomSelect,
) => JSX.Element;

interface InterfacePropsPostCreator {
  item: TypePost;
  onClick: () => void;
  onFileDrag: () => void;
  onFileDrop: () => void;
  onFileChange: (event: any) => void;
  onPDFChange: (event: any) => void;
  onPhotoChange: (event: any) => void;
  onFileDelete: (file: TypeFile) => void;
  onPublisherChange: ActionCreatorWithPayload<TypeUser, string>;
  onCustomSelectToggle: () => void;
  onDescriptionChange: (event: any) => void;
  onDescriptionFocus: (event: any) => void;
  onDescriptionBlur: (event: any) => void;
  onSubmitClick: () => void;
  fileUploadInfo: string;
}

type TypeRenderPostCreator = (props: InterfacePropsPostCreator) => JSX.Element;

interface InterfacePropsPostPublished {
  item: TypePost;
  onArchive: (post: TypePost) => void;
  onCopyLink: (post: TypePost) => void;
  onFileDelete: TypeOnFileDelete;
  onEdit: (post: TypePost) => void;
  onDelete: (post: TypePost) => void;
  onLikeChoice: (emoji: TypeEmoji) => void;
}

type TypeRenderPostPublished = (
  props: InterfacePropsPostPublished,
) => JSX.Element;

interface InterfacePropsPostArhived {
  item: TypePost;
  onDelete: (post: TypePost) => void;
}

type TypeRenderPostArchived = (props: InterfacePropsPostArhived) => JSX.Element;

type TypeRenderPostContainer = () => JSX.Element;

interface InterfacePropsDrawProgress {
  progress: number;
  colorMain: string;
  colorFrom: string;
  colorTo: string;
}

type TypeDrawProgress = (props: InterfacePropsDrawProgress) => string;

interface InterfacePropsPostFileSuccessPhoto {
  path: string;
  name: string;
}

type TypeRenderPostFileSuccessPhoto = (
  props: InterfacePropsPostFileSuccessPhoto,
) => JSX.Element;

interface InterfacePostFileSuccessPDF {
  name: string;
}

type TypeRenderPostFileSuccessPDF = (
  props: InterfacePostFileSuccessPDF,
) => JSX.Element;

interface InterfacePostFileError {
  error: string;
}

type TypeRenderPostFileError = (props: InterfacePostFileError) => JSX.Element;

interface InterfacePostFileLoad {
  progress: number;
  name: string;
}

type TypeRenderPostFileLoad = (props: InterfacePostFileLoad) => JSX.Element;

interface InterfaceFileLoadProgress {
  progress: number;
}

type TypeRenderFileLoadProgress = (
  props: InterfaceFileLoadProgress,
) => JSX.Element;

interface InterfacePostPDForPhoto {
  type: string;
  path: string;
  name: string;
}

type TypeRenderPostPDForPhoto = (props: InterfacePostPDForPhoto) => JSX.Element;

interface InterfacePropsCutString {
  value: string;
  maxLength: number;
}

type TypeCutString = (props: InterfacePropsCutString) => string;

interface InterfacePropsPostFileView {
  type: string;
  path: string;
  name: string;
}

type TypeRenderPostFileView = (
  props: InterfacePropsPostFileView,
) => JSX.Element;

interface InterfacePropsPostFileCreate extends InterfacePropsPostFileView {
  file: TypeFile;
  status: TypeFileStatus;
  progress: number;
  onFileDelete: (file: TypeFile) => void;
}

type TypeRenderPostFileCreate = (
  props: InterfacePropsPostFileCreate,
) => JSX.Element;

interface InterfacePropsPostControls {
  item: TypePost;
  onEdit: (post: TypePost) => void;
  onDelete: (post: TypePost) => void;
  onArchive: (post: TypePost) => void;
  onCopyLink: (post: TypePost) => void;
  onLikeChoice: (emoji: TypeEmoji) => void;
}

type TypeRenderPostControls = (
  props: InterfacePropsPostControls,
) => JSX.Element;

interface InterfacePropsPostEmotions {
  emotions: TypeEmoji[];
}

type TypeRenderPostEmotions = (
  props: InterfacePropsPostEmotions,
) => JSX.Element;

interface InterfacePropsPostEmotionsBig {
  onLikeClick: () => void;
  onLikeChoice: (emoji: TypeEmoji) => void;
}

type TypeRenderPostEmotionsBig = (
  props: InterfacePropsPostEmotionsBig,
) => JSX.Element;

interface InterfacePropsCustomInputFile {
  name: string;
  iconSrc: string;
  onChange: (event: any) => void;
}

type TypeRenderCustomInputFile = (
  props: InterfacePropsCustomInputFile,
) => JSX.Element;

interface InterfacePropsCustomDropZone {
  title: string;
  info: string;
  iconSrc: string;
  onChange: (event: any) => void;
}

type TypeRenderCustomDropZone = (
  props: InterfacePropsCustomDropZone,
) => JSX.Element;

interface InterfacePropsPublisher {
  publisher: TypeUser;
  onOptionPick: (event: any, publisher: TypeUser) => void;
}

type TypeRenderPublisher = (props: InterfacePropsPublisher) => JSX.Element;

interface InteracePostState {
  user: TypeUser;
  item: TypePost;
  publishersList: TypeUser[];
  isPublishersMenuOpened: boolean;
  isFileDragging: boolean;
  isFileDropped: boolean;
}

export { TypePostStatus, TypeFileStatus };

export type {
  TypeUser,
  TypeFile,
  TypeEmoji,
  TypeRenderPostFilesView,
  TypeRenderPostFilesCreate,
  TypeRenderPostFileView,
  TypeRenderPostFileCreate,
  TypeRenderPostControls,
  TypeRenderPostEmotions,
  TypeRenderPostEmotionsBig,
  TypeRenderPostCreator,
  TypeRenderCustomSelect,
  TypeRenderPostPublished,
  TypeRenderPostArchived,
  TypeRenderPostContainer,
  TypeRenderPostFileSuccessPhoto,
  TypeRenderPostFileSuccessPDF,
  TypeRenderPostFileError,
  TypeRenderPostPDForPhoto,
  TypeRenderPostFileLoad,
  TypeRenderFileLoadProgress,
  TypeRenderCustomInputFile,
  TypeRenderCustomDropZone,
  TypeRenderPublisher,
  TypeCutString,
  TypeDrawProgress,
  InteracePostState,
};
