import 'react-native';
import React from 'react';
import App from '../App';
import {render} from '@testing-library/react-native';

jest.mock('../src/context/AuthContext', () => ({
  AuthProvider: ({children}: any) => children,
  useAuth: () => ({
    user: null,
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
    hasRole: jest.fn(),
  }),
}));

jest.mock('../src/context/NotificationContext', () => ({
  NotificationProvider: ({children}: any) => children,
  useNotifications: () => ({
    notifications: [],
    unreadCount: 0,
    addNotification: jest.fn(),
    markAsRead: jest.fn(),
    clearNotifications: jest.fn(),
  }),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: any) => children,
}));

describe('App', () => {
  it('should render without crashing', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toBeTruthy();
  });
});
