import {
  generateNetwork,
  generateNetworks,
  generateEvent,
  generateEvents,
  generateEmotion,
  generateEmotions,
  generateEmoji,
  generateEmojis,
  generateOrganization,
  generateOrganizations,
  generatePost,
  generatePosts,
  generateUpload,
  generateUploads,
} from '../generators/colleague-cms';

import {
  Network,
  Event,
  Emotion,
  Emoji,
  Organization,
  Post,
  UploadFile,
} from '@dni-connectors/colleague-cms-api';
import { buildCRUD } from '../utils';

const buildNetworkCRUD = (size: number) =>
  buildCRUD<Network>(() => generateNetworks(size), generateNetwork);

const buildEventCRUD = (size: number) =>
  buildCRUD<Event>(() => generateEvents(size), generateEvent);

const buildEmotionCRUD = (size: number) =>
  buildCRUD<Emotion>(() => generateEmotions(size), generateEmotion);

const buildEmojiCRUD = (size: number) =>
  buildCRUD<Emoji>(() => generateEmojis(size), generateEmoji);

const buildOrganizationCRUD = (size: number) =>
  buildCRUD<Organization>(
    () => generateOrganizations(size),
    generateOrganization,
  );

const buildPostCRUD = (size: number) =>
  buildCRUD<Post>(() => generatePosts(size), generatePost);

const buildUploadCRUD = (size: number) =>
  buildCRUD<UploadFile>(() => generateUploads(size), generateUpload);

export {
  buildNetworkCRUD,
  buildEventCRUD,
  buildEmotionCRUD,
  buildEmojiCRUD,
  buildOrganizationCRUD,
  buildPostCRUD,
  buildUploadCRUD,
};
