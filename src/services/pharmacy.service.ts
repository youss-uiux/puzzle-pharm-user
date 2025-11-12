import apiService from './api.service';
import {ENDPOINTS} from '../config/api.config';
import {Pharmacy} from '../types';

class PharmacyService {
  async getNearbyPharmacies(
    latitude: number,
    longitude: number,
    radius: number = 5000,
  ): Promise<Pharmacy[]> {
    try {
      const response = await apiService.get<Pharmacy[]>(
        `${ENDPOINTS.PHARMACIES.NEARBY}?lat=${latitude}&lng=${longitude}&radius=${radius}`,
      );
      return response;
    } catch (error) {
      console.error('Get nearby pharmacies error:', error);
      throw error;
    }
  }

  async getPharmacyById(id: string): Promise<Pharmacy> {
    try {
      const response = await apiService.get<Pharmacy>(
        `${ENDPOINTS.PHARMACIES.GET_BY_ID}/${id}`,
      );
      return response;
    } catch (error) {
      console.error('Get pharmacy error:', error);
      throw error;
    }
  }

  async listPharmacies(
    page: number = 1,
    limit: number = 20,
  ): Promise<Pharmacy[]> {
    try {
      const response = await apiService.get<Pharmacy[]>(
        `${ENDPOINTS.PHARMACIES.LIST}?page=${page}&limit=${limit}`,
      );
      return response;
    } catch (error) {
      console.error('List pharmacies error:', error);
      throw error;
    }
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}

export default new PharmacyService();
