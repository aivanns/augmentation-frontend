import { io, Socket } from 'socket.io-client';
import { API_WS_URL } from '../constants';
import { useAuthStore } from '../../features/auth/model/store/auth.store';
import { toast } from 'sonner';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    const accessToken = useAuthStore.getState().accessToken;
    
    if (!accessToken) {
      console.log('No access token available');
      return;
    }

    if (this.socket?.connected) {
      this.socket.disconnect();
    }

    this.socket = io(API_WS_URL, {
      transports: ['websocket'],
      autoConnect: false,
      auth: {
        authorization: accessToken
      }
    });

    this.socket.connect();

    this.socket.on('connect', () => {
      console.log('Connected to socket with token:', accessToken);
      toast.success('Подключено к серверу');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket');
      toast.error('Отключено от сервера');
    });

    this.socket.on('connect_error', (error) => {
      console.log('Connection error:', error);
      toast.error('Ошибка подключения к серверу');
    });
  }

  reconnect() {
    this.connect();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    toast.error('Отключено от сервера');
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