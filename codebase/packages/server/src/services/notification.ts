import { getRepository, Notification, NotificationActionType, NotificationEntityType } from '@dni/database';
import { Network, Event, Post } from '@dni-connectors/colleague-cms-api';

type Input = {
  event: 'entry.update' | 'entry.create' | 'entry.delete';
  created_at: string;
  model: 'post' | 'event' | 'network';
  entry: Network | Event | Post;
};

const handleData = async (data: Input) => {
  try {
    const preparedData = analyze(data);

    if (preparedData) {
      getRepository(Notification).save(preparedData);
    }
  } catch (e) {
    console.log(e);
  }
};

const analyze = (data: Input) => {
  const entityType = analyzeEntityType(data);
  const entity = data.entry;
  const action = analyzeAction(data, entityType);

  if (entityType && action) {
    return {
      entityType,
      action,
      entity,
    };
  }
};

const analyzeEntityType = (data: Input) => {
  switch (data.model) {
    case 'post':
      return NotificationEntityType.POST;
    case 'event':
      return NotificationEntityType.EVENT;
    case 'network':
      return NotificationEntityType.NETWORK;
    default:
      return;
  }
};

const analyzeAction = (data: Input, entityType: NotificationEntityType | undefined) => {
  if (!entityType) {
    return;
  }

  switch (data.event) {
    case 'entry.create':
      switch (entityType) {
        case NotificationEntityType.POST:
          return NotificationActionType.POST_CREATED;
        case NotificationEntityType.EVENT:
          return NotificationActionType.EVENT_CREATED;
        case NotificationEntityType.NETWORK:
          return NotificationActionType.NETWORK_CREATED;
        default:
          return;
      }
    case 'entry.update':
      switch (entityType) {
        case NotificationEntityType.POST: {
          const post = data.entry as Post;
          if (post.archived) {
            return NotificationActionType.POST_ARCHIVED;
          } else {
            return NotificationActionType.POST_UPDATED;
          }
        }
        case NotificationEntityType.EVENT:
          return NotificationActionType.EVENT_UPDATED;
        case NotificationEntityType.NETWORK:
          return NotificationActionType.NETWORK_UPDATED;
        default:
          return;
      }
    case 'entry.delete':
      switch (entityType) {
        case NotificationEntityType.POST:
          return NotificationActionType.POST_REMOVED;
        case NotificationEntityType.EVENT:
          return NotificationActionType.EVENT_REMOVED;
        case NotificationEntityType.NETWORK:
          return NotificationActionType.NETWORK_REMOVED;
        default:
          return;
      }
    default:
      return;
  }
};

const findAllNotifications = () => {
  return getRepository(Notification).find({
    order: {
      createdAt: 'DESC',
    },
  });
};

export { analyze, handleData, findAllNotifications };
