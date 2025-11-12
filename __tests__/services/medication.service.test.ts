import medicationService from '../../src/services/medication.service';
import apiService from '../../src/services/api.service';
import {Medication} from '../../src/types';

jest.mock('../../src/services/api.service');

describe('MedicationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchMedications', () => {
    it('should search medications successfully', async () => {
      const mockMedications: Medication[] = [
        {
          id: '1',
          name: 'Aspirin',
          description: 'Pain reliever',
        },
      ];

      (apiService.get as jest.Mock).mockResolvedValue(mockMedications);

      const result = await medicationService.searchMedications('Aspirin');

      expect(result).toEqual(mockMedications);
      expect(apiService.get).toHaveBeenCalledWith(
        '/medications/search?q=Aspirin',
      );
    });

    it('should handle search error', async () => {
      const error = new Error('Network error');
      (apiService.get as jest.Mock).mockRejectedValue(error);

      await expect(
        medicationService.searchMedications('test'),
      ).rejects.toThrow('Network error');
    });
  });

  describe('getMedicationById', () => {
    it('should get medication by id successfully', async () => {
      const mockMedication: Medication = {
        id: '1',
        name: 'Aspirin',
        description: 'Pain reliever',
      };

      (apiService.get as jest.Mock).mockResolvedValue(mockMedication);

      const result = await medicationService.getMedicationById('1');

      expect(result).toEqual(mockMedication);
      expect(apiService.get).toHaveBeenCalledWith('/medications/1');
    });
  });
});
