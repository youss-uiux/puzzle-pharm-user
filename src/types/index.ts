export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  token: string;
}

export interface Medication {
  id: string;
  name: string;
  description: string;
  dosage?: string;
  manufacturer?: string;
  category?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phoneNumber?: string;
  distance?: number;
  rating?: number;
}

export interface MedicationPrice {
  medicationId: string;
  pharmacyId: string;
  price: number;
  availability: boolean;
  lastUpdated: string;
}

export interface PharmacyWithPrice extends Pharmacy {
  price?: number;
  availability?: boolean;
}

export interface SearchResult {
  medication: Medication;
  pharmacies: PharmacyWithPrice[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
  data?: any;
}

export interface Order {
  id: string;
  userId: string;
  medicationId: string;
  pharmacyId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}
