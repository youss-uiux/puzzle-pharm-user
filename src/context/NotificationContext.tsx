import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {Notification} from '../types';
import notificationService from '../services/notification.service';
import websocketService from '../services/websocket.service';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    notificationService.configure();
    notificationService.createChannel();

    const handleNotification = (notification: Notification) => {
      addNotification(notification);
      notificationService.showLocalNotification(
        notification.title,
        notification.message,
        notification.data,
      );
    };

    websocketService.onNotification(handleNotification);

    loadNotifications();

    return () => {
      websocketService.removeNotificationListener(handleNotification);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      const fetchedNotifications = await notificationService.getNotifications();
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error('Load notifications error:', error);
    }
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => (n.id === notificationId ? {...n, read: true} : n)),
      );
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
    notificationService.cancelAll();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        clearNotifications,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider',
    );
  }
  return context;
};
