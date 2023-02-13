import { io, Socket } from 'socket.io-client';

const eventsListening: string[] = [];

const API_URL = process.env.REACT_APP_BE_URL || 'http://localhost:3001';


let socket: Socket | undefined

export function on(name: string, cb: (...args: any[]) => void) {
    eventsListening.push(name);
    socket?.on(name, cb);
}

export function connect(): void {
    socket = io(`${API_URL }`);
}

export function disconnect(): void {
    eventsListening.forEach((item) => {
        socket?.off(item);
    })
    socket?.disconnect();
}

export function send(msg: string): void {
    socket?.emit('send_update', msg)
    console.log('updating code', msg)
}


