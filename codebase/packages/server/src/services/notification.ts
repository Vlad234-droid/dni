import { Server, Socket } from 'socket.io';
import { getRepository, Notification, NotificationActionType, NotificationEntityType } from '@dni/database';
import { Network, Event, Post } from '@dni-connectors/colleague-cms-api';
import server from 'app';

// events
const NOTIFICATIONS = 'notifications';
const NOTIFICATION_CREATE = 'notification-create';
const NOTIFICATION_REMOVE = 'notification-remove';

type Input = {
  event: 'entry.update' | 'entry.create' | 'entry.delete';
  created_at: string;
  model: 'post' | 'event' | 'network';
  entry: Network | Event | Post;
};

let socketServer: Server;

const establishConnection = (io: Server) => {
  socketServer = io;
  console.log(`⚡️[ws-server]: Socket server initialized at path: ${io.path()}`);
  //console.log(socketServer);

  io.on('connection', (socket: Socket) => {
    console.log(
      `Console WS connection established: ${socket.id}, ` +
        `url: ${socket.handshake.url}, ` +
        `secured: ${socket.handshake.secure}, ` +
        `address: ${socket.handshake.address}`,
    );

    socket.on(NOTIFICATIONS, async () => {
      socket.emit(NOTIFICATIONS, await findAllNotifications());
    });

    socket.on(NOTIFICATION_REMOVE, async (ids: number[]) => {
      await getRepository(Notification).delete(ids);
      socket.emit(NOTIFICATION_REMOVE, ids);
      socket.emit(NOTIFICATIONS, await findAllNotifications());
    });
  });
};

const emitWsData = async (wsEvent: string, data: string) => {
  try {
    if (socketServer) {
      console.log(`Emiting event: ${wsEvent}`);
      socketServer.emit(wsEvent, data);
    }
  } catch (e) {
    console.log(e);
  }
};

const handleData = async (data: Input) => {
  try {
    const preparedData = analyze(data);

    if (preparedData) {
      const result = await getRepository(Notification).save(preparedData);
      if (socketServer) {
        socketServer.emit(NOTIFICATIONS, await findAllNotifications());
        socketServer.emit(NOTIFICATION_CREATE, [result]);
      }
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

export { establishConnection, analyze, handleData, emitWsData };
