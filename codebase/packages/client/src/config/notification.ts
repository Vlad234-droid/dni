import { io } from 'socket.io-client';

let socketUrl = process.env.REACT_APP_WS_URL;

if (process.env.PUBLIC_URL && process.env.PUBLIC_URL !== '/') {
  socketUrl = `${process.env.PUBLIC_URL}${socketUrl}`;
}


const defaultProps = { transports: ['websocket', 'polling'] };

const NOTIFICATIONS = 'notifications';
const NOTIFICATION_CREATE = 'notification-create';
const NOTIFICATION_REMOVE = 'notification-remove';

const socket = io(socketUrl!, defaultProps);

export {
  socket,
  socketUrl,
  NOTIFICATIONS,
  NOTIFICATION_REMOVE,
  NOTIFICATION_CREATE,
};
