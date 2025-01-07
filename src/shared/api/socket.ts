import { io, Socket } from 'socket.io-client';
import { API_URL } from '../constants';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    this.socket = io(API_URL, {
      transports: ['websocket'],
      autoConnect: false,
    });

    this.socket.connect();

    this.socket.on('connect', () => {
      console.log('Connected to socket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }
}

export const socketService = new SocketService(); 