import type http from 'http';
import socketIO from 'socket.io';
import { corsOption } from '../config/cors';

export const socketConnect = (webserver: http.Server): void => {
    const io = new socketIO.Server(webserver, { cors: corsOption });
  
    io.sockets.on('connection', (socket: socketIO.Socket) => {
        socket.emit('message', { msg: 'Welcome' + socket.id });
        console.log('connect success');
        console.log('msg: Welcome + socketId:', socket.id);
        disconnect(socket); // 소켓 서버 연결해제.
    });
};

const disconnect = (socket: socketIO.Socket): void => {
    socket.on('disconnect', () => {
        console.log('소켓 연결 해제');
        socket.removeAllListeners();
    });
};
  