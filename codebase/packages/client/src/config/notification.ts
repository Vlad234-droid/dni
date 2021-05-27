import { io } from 'socket.io-client';
import { PUBLIC_URL, SOCKET_URL } from 'config/api';

let socketUrl = SOCKET_URL;

if (PUBLIC_URL && PUBLIC_URL !== '/') {
  socketUrl = `${PUBLIC_URL}${socketUrl}`;
}

const defaultProps = { transports: ['websocket', 'polling'], path: socketUrl };

const NOTIFICATIONS = 'notifications';
const NOTIFICATION_CREATE = 'notification-create';
const NOTIFICATION_REMOVE = 'notification-remove';

const socket = io('/', defaultProps);

export {
  socket,
  //socketUrl,
  NOTIFICATIONS,
  NOTIFICATION_REMOVE,
  NOTIFICATION_CREATE,
};
