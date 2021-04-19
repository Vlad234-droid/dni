import { Server, Socket } from 'socket.io';
import { Op } from 'sequelize';
import { DB } from '../config/db';
import { Network, Event, Post } from '@dni-connectors/colleague-cms-api';
import { ActionType, EntityType } from '../models';

// events
const NOTIFICATIONS = 'notifications';
const NOTIFICATION_CREATE = 'notification-create';
const NOTIFICATION_REMOVE = 'notification-remove';

let openSocket: Socket;

type Input = {
  event: 'entry.update' | 'entry.create' | 'entry.delete';
  created_at: string;
  model: 'post' | 'event' | 'network';
  entry: Network | Event | Post;
};

const handleData = async (data: Input) => {
  const preparedData = analyze(data);

  if (preparedData) {
    const result = await DB.Notification.create(preparedData);
    if (openSocket) {
      openSocket.emit(NOTIFICATIONS, await findAllNotifications());
      openSocket.emit(NOTIFICATION_CREATE, [result]);
    }
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
      return EntityType.POST;
    case 'event':
      return EntityType.EVENT;
    case 'network':
      return EntityType.NETWORK;
    default:
      return;
  }
};

const analyzeAction = (data: Input, entityType: EntityType | undefined) => {
  if (!entityType) {
    return;
  }

  switch (data.event) {
    case 'entry.create':
      switch (entityType) {
        case EntityType.POST:
          return ActionType.POST_CREATED;
        case EntityType.EVENT:
          return ActionType.EVENT_CREATED;
        case EntityType.NETWORK:
          return ActionType.NETWORK_CREATED;
        default:
          return;
      }
    case 'entry.update':
      switch (entityType) {
        case EntityType.POST: {
          const post = data.entry as Post;
          if (post.archived) {
            return ActionType.POST_ARCHIVED;
          } else {
            return ActionType.POST_UPDATED;
          }
        }
        case EntityType.EVENT:
          return ActionType.EVENT_UPDATED;
        case EntityType.NETWORK:
          return ActionType.NETWORK_UPDATED;
        default:
          return;
      }
    case 'entry.delete':
      switch (entityType) {
        case EntityType.POST:
          return ActionType.POST_REMOVED;
        case EntityType.EVENT:
          return ActionType.EVENT_REMOVED;
        case EntityType.NETWORK:
          return ActionType.NETWORK_REMOVED;
        default:
          return;
      }
    default:
      return;
  }
};

const findAllNotifications = () => {
  return DB.Notification.findAll({
    order: [['createdAt', 'DESC']],
  });
};

const establishConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    openSocket = socket;
    socket.on(NOTIFICATIONS, async () => {
      socket.emit(NOTIFICATIONS, await findAllNotifications());
    });
    socket.on(NOTIFICATION_REMOVE, async (ids: number[]) => {
      await DB.Notification.destroy({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });
      socket.emit(NOTIFICATION_REMOVE, ids);
      socket.emit(NOTIFICATIONS, await findAllNotifications());
    });
  });
};

export { establishConnection, analyze, handleData };
