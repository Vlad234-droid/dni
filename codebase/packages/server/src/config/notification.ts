import { Server } from 'socket.io';
import http from 'http';

export const buildIO = (server: http.Server) =>
  new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
