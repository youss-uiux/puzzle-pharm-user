export const API_CONFIG = {
  BASE_URL: process.env.API_BASE_URL || 'https://api.puzzle-pharm.com',
  WEBSOCKET_URL: process.env.WEBSOCKET_URL || 'wss://api.puzzle-pharm.com',
  KEYCLOAK_URL: process.env.KEYCLOAK_URL || 'https://auth.puzzle-pharm.com',
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM || 'puzzle-pharm',
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID || 'puzzle-pharm-user-app',
  KAFKA_BROKERS: process.env.KAFKA_BROKERS || 'localhost:9092',
  TIMEOUT: 30000,
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
  },
  MEDICATIONS: {
    SEARCH: '/medications/search',
    GET_BY_ID: '/medications',
    LIST: '/medications',
  },
  PHARMACIES: {
    LIST: '/pharmacies',
    GET_BY_ID: '/pharmacies',
    NEARBY: '/pharmacies/nearby',
  },
  PRICES: {
    GET_BY_MEDICATION: '/prices/medication',
    GET_BY_PHARMACY: '/prices/pharmacy',
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    GET_BY_ID: '/orders',
    UPDATE_STATUS: '/orders/status',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/read',
  },
};
