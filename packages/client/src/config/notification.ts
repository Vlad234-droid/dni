import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_WS_URL;

const defaultProps = { transports: ['websocket', 'polling'] };

const NOTIFICATIONS = 'notifications';
const NOTIFICATION_CREATE = 'notification-create';
const NOTIFICATION_REMOVE = 'notification-remove';

const socket = io(SOCKET_URL!, defaultProps);

export {
  socket,
  SOCKET_URL,
  NOTIFICATIONS,
  NOTIFICATION_REMOVE,
  NOTIFICATION_CREATE,
};
