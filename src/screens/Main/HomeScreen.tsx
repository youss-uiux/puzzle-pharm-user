import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../../navigation/MainNavigator';
import medicationService from '../../services/medication.service';
import {Medication} from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const data = await medicationService.listMedications(1, 20);
      setMedications(data);
    } catch (error) {
      console.error('Load medications error:', error);
      Alert.alert('Erreur', 'Impossible de charger les médicaments');
    } finally {
      setLoading(false);
    }
  };

  const handleMedicationPress = (medication: Medication) => {
    navigation.navigate('PharmacyList', {
      medicationId: medication.id,
      medicationName: medication.name,
    });
  };

  const renderMedicationItem = ({item}: {item: Medication}) => (
    <TouchableOpacity
      style={styles.medicationCard}
      onPress={() => handleMedicationPress(item)}>
      <View style={styles.medicationIcon}>
        <Icon name="medical" size={30} color="#007AFF" />
      </View>
      <View style={styles.medicationInfo}>
        <Text style={styles.medicationName}>{item.name}</Text>
        {item.description && (
          <Text style={styles.medicationDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        {item.dosage && (
          <Text style={styles.medicationDosage}>Dosage: {item.dosage}</Text>
        )}
      </View>
      <Icon name="chevron-forward" size={24} color="#CCCCCC" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Médicaments disponibles</Text>
        <Text style={styles.headerSubtitle}>
          Sélectionnez un médicament pour voir les pharmacies
        </Text>
      </View>

      <FlatList
        data={medications}
        renderItem={renderMedicationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="medical-outline" size={60} color="#CCCCCC" />
            <Text style={styles.emptyText}>Aucun médicament disponible</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  listContent: {
    padding: 15,
  },
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  medicationDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 12,
    color: '#999999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    marginTop: 10,
  },
});

export default HomeScreen;
