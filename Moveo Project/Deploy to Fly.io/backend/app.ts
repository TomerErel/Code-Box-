import express from 'express';
import cors from 'cors';
import { logger } from './middlewares/logger';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';
import { codeBoxRouter } from './code-box/code-box.controller';
import { Server, Server as SocketServer, Socket } from 'socket.io';
import { databaseMigration } from './db';
import { config } from './config/index';

const app = express();

app.use(
  cors({
    origin: config.frontendDomain,
    credentials: true
  }),
);

// logger middleware for all requests
app.use(logger);

// JSON parse the request body
app.use(express.json());

// all code routes
app.use('/api/v1/code', codeBoxRouter);

// not found middleware
app.use(notFound);

// generic error handler
app.use(errorHandler);

// start the server

(async () => {
  const httpServer = app.listen(3001, async () => {
    await databaseMigration()
    console.log('Service is listening on port 3001.... ');
  });

  const clients: Record<string, Socket> = {};

  const socketServer = new Server(httpServer, { cors: { origin: '*' } });

  socketServer.sockets.on('connection', (socket) => {
    console.log(`Socket A new client (${socket.id}) has been connnected: `);

    clients[socket.id] = socket

    socket.emit("set_role", Object.keys(clients).length === 1 ? 'mentor' : 'student');

    // listen to a client disconnection
    socket.on("disconnect", () => {
      console.log(`Socket A client (${socket.id}) has been disconnected: `);
      delete clients[socket.id]
    });

    // when the client sends a message, send it to all connected clients
    socket.on("send_update", (msg: string) => {
      console.log('updated msg', msg)
      socket.broadcast.emit('receive_update', msg)
    });
  })
})()

