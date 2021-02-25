import { RootState } from 'store/rootReducer';

const selectors = {
  getPost: ({ post }: RootState) => post.item,
  getPostStatus: ({ post }: RootState) => post.item.status,
  getPostDescription: ({ post }: RootState) => post.item.description,
  getPublishersList: ({ post }: RootState) => post.publishersList,
  getPostPublisherName: ({ post }: RootState) => post.item.createdBy?.name,
  getIsMenuOpened: ({ post }: RootState) => post.isPublishersMenuOpened,
  getIsFileDragging: ({ post }: RootState) => post.isFileDragging,
  getPostEmotions: ({ post }: RootState) => post.item.emotions,
};

export { selectors };
