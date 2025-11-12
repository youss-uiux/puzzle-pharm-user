import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from './api.service';
import {ENDPOINTS, API_CONFIG} from '../config/api.config';
import {User} from '../types';

class AuthService {
  async login(username: string, password: string): Promise<User> {
    try {
      const response = await apiService.post<{user: User; token: string}>(
        ENDPOINTS.AUTH.LOGIN,
        {
          username,
          password,
          clientId: API_CONFIG.KEYCLOAK_CLIENT_ID,
          realm: API_CONFIG.KEYCLOAK_REALM,
        },
      );

      const {user, token} = response;
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(
    username: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<User> {
    try {
      const response = await apiService.post<{user: User; token: string}>(
        ENDPOINTS.AUTH.REGISTER,
        {
          username,
          email,
          password,
          firstName,
          lastName,
          clientId: API_CONFIG.KEYCLOAK_CLIENT_ID,
          realm: API_CONFIG.KEYCLOAK_REALM,
        },
      );

      const {user, token} = response;
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.post(ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const response = await apiService.post<{token: string}>(
        ENDPOINTS.AUTH.REFRESH,
      );
      await AsyncStorage.setItem('authToken', response.token);
      return response.token;
    } catch (error) {
      console.error('Refresh token error:', error);
      return null;
    }
  }

  hasRole(user: User | null, role: string): boolean {
    return user?.roles?.includes(role) || false;
  }
}

export default new AuthService();
