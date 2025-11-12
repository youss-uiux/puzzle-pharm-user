import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigation/MainNavigator';
import pharmacyService from '../../services/pharmacy.service';
import {Pharmacy} from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';

type PharmacyDetailScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'PharmacyDetail'
>;
type PharmacyDetailScreenRouteProp = RouteProp<
  HomeStackParamList,
  'PharmacyDetail'
>;

interface Props {
  navigation: PharmacyDetailScreenNavigationProp;
  route: PharmacyDetailScreenRouteProp;
}

const PharmacyDetailScreen: React.FC<Props> = ({route}) => {
  const {pharmacyId} = route.params;
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPharmacy();
  }, []);

  const loadPharmacy = async () => {
    try {
      const data = await pharmacyService.getPharmacyById(pharmacyId);
      setPharmacy(data);
    } catch (error) {
      console.error('Load pharmacy error:', error);
      Alert.alert('Erreur', 'Impossible de charger les détails de la pharmacie');
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    if (pharmacy?.phoneNumber) {
      Linking.openURL(`tel:${pharmacy.phoneNumber}`);
    }
  };

  const handleNavigate = () => {
    if (pharmacy) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`;
      Linking.openURL(url);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!pharmacy) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={60} color="#F44336" />
        <Text style={styles.errorText}>Pharmacie non trouvée</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="medkit" size={40} color="#007AFF" />
        </View>
        <Text style={styles.name}>{pharmacy.name}</Text>
        {pharmacy.rating && (
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFC107" />
            <Text style={styles.rating}>{pharmacy.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="location" size={20} color="#007AFF" />
          <Text style={styles.sectionTitle}>Adresse</Text>
        </View>
        <Text style={styles.sectionText}>{pharmacy.address}</Text>
      </View>

      {pharmacy.phoneNumber && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="call" size={20} color="#007AFF" />
            <Text style={styles.sectionTitle}>Téléphone</Text>
          </View>
          <Text style={styles.sectionText}>{pharmacy.phoneNumber}</Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        {pharmacy.phoneNumber && (
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Icon name="call" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Appeler</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.navigationButton]}
          onPress={handleNavigate}>
          <Icon name="navigate" size={24} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Itinéraire</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="information-circle" size={20} color="#007AFF" />
          <Text style={styles.sectionTitle}>Informations</Text>
        </View>
        <Text style={styles.infoText}>
          Cette pharmacie fait partie du réseau Puzzle-Pharm et propose une
          large gamme de médicaments et de produits pharmaceutiques.
        </Text>
      </View>
    </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#F44336',
    marginTop: 10,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 5,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  navigationButton: {
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default PharmacyDetailScreen;
