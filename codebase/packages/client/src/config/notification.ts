import { io, Socket } from 'socket.io-client';
import { PUBLIC_URL, SOCKET_URL } from 'config/api';

let socketUrl = SOCKET_URL;

if (PUBLIC_URL && PUBLIC_URL !== '/') {
  socketUrl = `${PUBLIC_URL}${socketUrl}`;
}

const defaultProps = {
  transports: [ 'websocket' ],
  path: socketUrl,
};

const NOTIFICATIONS = 'notifications';
const NOTIFICATION_CREATE = 'notification-create';
const NOTIFICATION_REMOVE = 'notification-remove';

let socket: Socket | undefined = undefined;

try {
  console.log(`Initializing WebSocket connection to: ${socketUrl}`);
  socket = io('/', defaultProps);
} catch (e) {
  console.error(`Can not initialize WebSocket connection. `);
  console.error(e);
}

export {
  socket,
  //socketUrl,
  NOTIFICATIONS,
  NOTIFICATION_REMOVE,
  NOTIFICATION_CREATE,
};
