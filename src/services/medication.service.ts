import apiService from './api.service';
import {ENDPOINTS} from '../config/api.config';
import {Medication, SearchResult, PharmacyWithPrice} from '../types';

class MedicationService {
  async searchMedications(query: string): Promise<Medication[]> {
    try {
      const response = await apiService.get<Medication[]>(
        `${ENDPOINTS.MEDICATIONS.SEARCH}?q=${encodeURIComponent(query)}`,
      );
      return response;
    } catch (error) {
      console.error('Search medications error:', error);
      throw error;
    }
  }

  async getMedicationById(id: string): Promise<Medication> {
    try {
      const response = await apiService.get<Medication>(
        `${ENDPOINTS.MEDICATIONS.GET_BY_ID}/${id}`,
      );
      return response;
    } catch (error) {
      console.error('Get medication error:', error);
      throw error;
    }
  }

  async listMedications(
    page: number = 1,
    limit: number = 20,
  ): Promise<Medication[]> {
    try {
      const response = await apiService.get<Medication[]>(
        `${ENDPOINTS.MEDICATIONS.LIST}?page=${page}&limit=${limit}`,
      );
      return response;
    } catch (error) {
      console.error('List medications error:', error);
      throw error;
    }
  }

  async searchWithPharmacies(
    medicationId: string,
    latitude: number,
    longitude: number,
  ): Promise<SearchResult> {
    try {
      const [medication, pharmacies] = await Promise.all([
        this.getMedicationById(medicationId),
        this.getPharmaciesWithPrice(medicationId, latitude, longitude),
      ]);

      return {
        medication,
        pharmacies,
      };
    } catch (error) {
      console.error('Search with pharmacies error:', error);
      throw error;
    }
  }

  private async getPharmaciesWithPrice(
    medicationId: string,
    latitude: number,
    longitude: number,
  ): Promise<PharmacyWithPrice[]> {
    try {
      const response = await apiService.get<PharmacyWithPrice[]>(
        `${ENDPOINTS.PRICES.GET_BY_MEDICATION}/${medicationId}?lat=${latitude}&lng=${longitude}`,
      );
      return response;
    } catch (error) {
      console.error('Get pharmacies with price error:', error);
      throw error;
    }
  }
}

export default new MedicationService();
