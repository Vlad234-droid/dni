import { io, Socket } from 'socket.io-client';
import { PUBLIC_URL, SOCKET_URL } from 'config/api';

let socketUrl = SOCKET_URL;

if (PUBLIC_URL && PUBLIC_URL !== '/') {
  socketUrl = `${PUBLIC_URL}${socketUrl}`;
}

const defaultProps = { transports: ['websocket', 'polling'], path: socketUrl };

const NOTIFICATIONS = 'notifications';
const NOTIFICATION_CREATE = 'notification-create';
const NOTIFICATION_REMOVE = 'notification-remove';

let socket: Socket | undefined = undefined;

try {
  console.log(`Trying to establish WS sonnection to: ${socketUrl}`);
  socket = io('/', defaultProps);
  console.log(`WS connection established`);
  console.log(console);
} catch (e) {
  console.error(`Can not establish WS connection`);
  console.error(e);
}

export {
  socket,
  //socketUrl,
  NOTIFICATIONS,
  NOTIFICATION_REMOVE,
  NOTIFICATION_CREATE,
};
