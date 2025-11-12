import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen: React.FC = () => {
  const {user, logout} = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {text: 'Annuler', style: 'cancel'},
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Erreur', 'Impossible de se déconnecter');
            }
          },
        },
      ],
    );
  };

  const renderMenuItem = (
    icon: string,
    title: string,
    onPress: () => void,
    danger?: boolean,
  ) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}>
      <Icon
        name={icon}
        size={24}
        color={danger ? '#F44336' : '#007AFF'}
      />
      <Text style={[styles.menuItemText, danger && styles.dangerText]}>
        {title}
      </Text>
      <Icon name="chevron-forward" size={24} color="#CCCCCC" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={50} color="#007AFF" />
        </View>
        <Text style={styles.userName}>
          {user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : user?.username}
        </Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compte</Text>
        {renderMenuItem('person-outline', 'Informations personnelles', () => {
          Alert.alert('Info', 'Fonctionnalité à venir');
        })}
        {renderMenuItem('key-outline', 'Changer le mot de passe', () => {
          Alert.alert('Info', 'Fonctionnalité à venir');
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Commandes</Text>
        {renderMenuItem('receipt-outline', 'Historique des commandes', () => {
          Alert.alert('Info', 'Fonctionnalité à venir - Évolution prévue');
        })}
        {renderMenuItem('time-outline', 'Commandes en cours', () => {
          Alert.alert('Info', 'Fonctionnalité à venir - Évolution prévue');
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences</Text>
        {renderMenuItem('notifications-outline', 'Notifications', () => {
          Alert.alert('Info', 'Fonctionnalité à venir');
        })}
        {renderMenuItem('language-outline', 'Langue', () => {
          Alert.alert('Info', 'Fonctionnalité à venir');
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        {renderMenuItem('help-circle-outline', 'Aide', () => {
          Alert.alert('Info', 'Fonctionnalité à venir');
        })}
        {renderMenuItem('information-circle-outline', 'À propos', () => {
          Alert.alert(
            'Puzzle Pharm',
            'Version 1.0.0\n\nApplication mobile pour rechercher des médicaments et trouver des pharmacies à proximité.',
          );
        })}
      </View>

      <View style={styles.section}>
        {renderMenuItem('log-out-outline', 'Déconnexion', handleLogout, true)}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Puzzle Pharm © 2024</Text>
        <Text style={styles.footerSubtext}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999999',
    padding: 15,
    paddingBottom: 5,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 15,
  },
  dangerText: {
    color: '#F44336',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#CCCCCC',
  },
});

export default ProfileScreen;
