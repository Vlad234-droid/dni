import { Server } from 'socket.io';
import http from 'http';

export const buildWebSocketsServer = (server: http.Server) =>
  new Server(server, {
    path: '/socket.io/',
    pingTimeout: 40000,
    pingInterval: 30000,
    transports: [ 'websocket' ],
    allowUpgrades: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'HEAD', 'PUT'],
      credentials: true,
    },
  });
