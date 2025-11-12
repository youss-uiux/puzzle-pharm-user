import io, {Socket} from 'socket.io-client';
import {API_CONFIG} from '../config/api.config';
import {Notification} from '../types';

type NotificationCallback = (notification: Notification) => void;
type ConnectionCallback = () => void;
type ErrorCallback = (error: any) => void;

class WebSocketService {
  private socket: Socket | null = null;
  private notificationCallbacks: NotificationCallback[] = [];
  private connectionCallbacks: ConnectionCallback[] = [];
  private errorCallbacks: ErrorCallback[] = [];

  connect(token: string): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(API_CONFIG.WEBSOCKET_URL, {
      auth: {
        token,
      },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.connectionCallbacks.forEach(callback => callback());
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('notification', (notification: Notification) => {
      console.log('Received notification:', notification);
      this.notificationCallbacks.forEach(callback => callback(notification));
    });

    this.socket.on('price_update', (data: any) => {
      console.log('Price update received:', data);
    });

    this.socket.on('order_status', (data: any) => {
      console.log('Order status update:', data);
    });

    this.socket.on('error', (error: any) => {
      console.error('WebSocket error:', error);
      this.errorCallbacks.forEach(callback => callback(error));
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onNotification(callback: NotificationCallback): void {
    this.notificationCallbacks.push(callback);
  }

  onConnection(callback: ConnectionCallback): void {
    this.connectionCallbacks.push(callback);
  }

  onError(callback: ErrorCallback): void {
    this.errorCallbacks.push(callback);
  }

  removeNotificationListener(callback: NotificationCallback): void {
    this.notificationCallbacks = this.notificationCallbacks.filter(
      cb => cb !== callback,
    );
  }

  emit(event: string, data: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default new WebSocketService();
