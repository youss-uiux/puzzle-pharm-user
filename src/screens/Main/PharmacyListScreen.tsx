import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from '../../navigation/MainNavigator';
import Geolocation from 'react-native-geolocation-service';
import medicationService from '../../services/medication.service';
import pharmacyService from '../../services/pharmacy.service';
import {PharmacyWithPrice, Location} from '../../types';
import Icon from 'react-native-vector-icons/Ionicons';

type PharmacyListScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'PharmacyList'
>;
type PharmacyListScreenRouteProp = RouteProp<
  HomeStackParamList,
  'PharmacyList'
>;

interface Props {
  navigation: PharmacyListScreenNavigationProp;
  route: PharmacyListScreenRouteProp;
}

const PharmacyListScreen: React.FC<Props> = ({navigation, route}) => {
  const {medicationId, medicationName} = route.params;
  const [pharmacies, setPharmacies] = useState<PharmacyWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert(
            'Permission refusée',
            'La localisation est nécessaire pour trouver les pharmacies proches',
          );
          setLoading(false);
        }
      } catch (error) {
        console.error('Permission error:', error);
        setLoading(false);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        loadPharmacies(latitude, longitude);
      },
      error => {
        console.error('Location error:', error);
        Alert.alert('Erreur', 'Impossible d\'obtenir votre position');
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const loadPharmacies = async (latitude: number, longitude: number) => {
    try {
      const result = await medicationService.searchWithPharmacies(
        medicationId,
        latitude,
        longitude,
      );

      const pharmaciesWithDistance = result.pharmacies.map(pharmacy => ({
        ...pharmacy,
        distance: pharmacyService.calculateDistance(
          latitude,
          longitude,
          pharmacy.latitude,
          pharmacy.longitude,
        ),
      }));

      pharmaciesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      setPharmacies(pharmaciesWithDistance);
    } catch (error) {
      console.error('Load pharmacies error:', error);
      Alert.alert('Erreur', 'Impossible de charger les pharmacies');
    } finally {
      setLoading(false);
    }
  };

  const formatDistance = (distance?: number): string => {
    if (!distance) return 'Distance inconnue';
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  const formatPrice = (price?: number): string => {
    if (!price) return 'Prix non disponible';
    return `${price.toFixed(2)} MAD`;
  };

  const renderPharmacyItem = ({item}: {item: PharmacyWithPrice}) => (
    <TouchableOpacity
      style={styles.pharmacyCard}
      onPress={() =>
        navigation.navigate('PharmacyDetail', {pharmacyId: item.id})
      }>
      <View style={styles.pharmacyHeader}>
        <View style={styles.pharmacyIcon}>
          <Icon name="medkit" size={24} color="#007AFF" />
        </View>
        <View style={styles.pharmacyMainInfo}>
          <Text style={styles.pharmacyName}>{item.name}</Text>
          <Text style={styles.pharmacyAddress} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
      </View>

      <View style={styles.pharmacyDetails}>
        <View style={styles.detailRow}>
          <Icon name="location" size={16} color="#666666" />
          <Text style={styles.detailText}>{formatDistance(item.distance)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="pricetag" size={16} color="#666666" />
          <Text style={styles.detailText}>{formatPrice(item.price)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon
            name={item.availability ? 'checkmark-circle' : 'close-circle'}
            size={16}
            color={item.availability ? '#4CAF50' : '#F44336'}
          />
          <Text
            style={[
              styles.detailText,
              {color: item.availability ? '#4CAF50' : '#F44336'},
            ]}>
            {item.availability ? 'Disponible' : 'Non disponible'}
          </Text>
        </View>
      </View>

      <Icon
        name="chevron-forward"
        size={24}
        color="#CCCCCC"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Recherche des pharmacies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{medicationName}</Text>
        <Text style={styles.headerSubtitle}>
          {pharmacies.length} pharmacie(s) trouvée(s)
        </Text>
      </View>

      <FlatList
        data={pharmacies}
        renderItem={renderPharmacyItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="medkit-outline" size={60} color="#CCCCCC" />
            <Text style={styles.emptyText}>Aucune pharmacie trouvée</Text>
            <Text style={styles.emptySubtext}>
              Ce médicament n'est pas disponible près de vous
            </Text>
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
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
  pharmacyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pharmacyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pharmacyMainInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#666666',
  },
  pharmacyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  chevron: {
    position: 'absolute',
    right: 15,
    top: '50%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 15,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});

export default PharmacyListScreen;
