import { io } from 'socket.io-client';
import { PUBLIC_URL, SOCKET_URL } from 'config/api';

let socketUrl = SOCKET_URL;

if (PUBLIC_URL && PUBLIC_URL !== '/') {
  socketUrl = `${PUBLIC_URL}${socketUrl}`;
}

console.log(`PUBLIC_URL = ${PUBLIC_URL}`);
console.log(`SOCKET_URL = ${SOCKET_URL}`);
console.log(`socketUrl = ${socketUrl}`);


const defaultProps = { transports: ['websocket', 'polling'] };

const NOTIFICATIONS = 'notifications';
const NOTIFICATION_CREATE = 'notification-create';
const NOTIFICATION_REMOVE = 'notification-remove';

const socket = io(socketUrl, defaultProps);

console.log(socket);

export {
  socket,
  //socketUrl,
  NOTIFICATIONS,
  NOTIFICATION_REMOVE,
  NOTIFICATION_CREATE,
};
