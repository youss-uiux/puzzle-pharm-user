import PushNotification from 'react-native-push-notification';
import apiService from './api.service';
import {ENDPOINTS} from '../config/api.config';
import {Notification} from '../types';

class NotificationService {
  configure(): void {
    PushNotification.configure({
      onRegister: token => {
        console.log('Push notification token:', token);
      },
      onNotification: notification => {
        console.log('Push notification received:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  createChannel(): void {
    PushNotification.createChannel(
      {
        channelId: 'puzzle-pharm-default',
        channelName: 'Default Notifications',
        channelDescription: 'Default notification channel',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`),
    );
  }

  showLocalNotification(title: string, message: string, data?: any): void {
    PushNotification.localNotification({
      channelId: 'puzzle-pharm-default',
      title,
      message,
      data,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      vibrate: true,
      vibration: 300,
    });
  }

  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await apiService.get<Notification[]>(
        ENDPOINTS.NOTIFICATIONS.LIST,
      );
      return response;
    } catch (error) {
      console.error('Get notifications error:', error);
      throw error;
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      await apiService.post(
        `${ENDPOINTS.NOTIFICATIONS.MARK_READ}/${notificationId}`,
      );
    } catch (error) {
      console.error('Mark notification as read error:', error);
      throw error;
    }
  }

  cancelAll(): void {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default new NotificationService();
