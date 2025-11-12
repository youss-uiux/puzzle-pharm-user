# Fonctionnalités Détaillées - Puzzle-Pharm User App

## 🔐 Authentification et Sécurité

### Connexion
- Formulaire de connexion avec username et mot de passe
- Validation côté client
- Messages d'erreur explicites
- Stockage sécurisé du token JWT
- Redirection automatique vers l'écran principal après connexion

### Inscription
- Formulaire d'inscription complet
- Champs: username, email, prénom, nom, mot de passe
- Validation de mot de passe (minimum 6 caractères)
- Confirmation de mot de passe
- Création de compte via Keycloak

### Gestion de Session
- Token JWT stocké de manière sécurisée
- Refresh automatique du token
- Déconnexion automatique en cas d'expiration
- Gestion des erreurs 401 (non autorisé)

### Contrôle d'Accès
- Vérification des rôles utilisateur
- Restriction d'accès basée sur les rôles
- Integration complète avec Keycloak

## 💊 Recherche de Médicaments

### Page d'Accueil
- Liste des médicaments disponibles
- Affichage des informations:
  - Nom du médicament
  - Description
  - Dosage
  - Catégorie
- Navigation vers la liste des pharmacies au clic
- Pull-to-refresh pour actualiser la liste
- Scroll infini (préparé pour pagination)

### Recherche
- Barre de recherche intuitive
- Recherche en temps réel
- Affichage des résultats filtrés
- Icône de recherche et bouton de recherche
- Effacement rapide de la recherche
- Messages appropriés pour aucun résultat
- Navigation vers les pharmacies depuis les résultats

### Détails Médicament
- Informations complètes du médicament
- Dosage et catégorie
- Description détaillée
- Fabricant (si disponible)

## 🏥 Localisation des Pharmacies

### Liste des Pharmacies
- Demande de permission de localisation
- Calcul automatique de la distance
- Affichage des pharmacies triées par distance
- Informations affichées:
  - Nom de la pharmacie
  - Adresse
  - Distance (en mètres ou kilomètres)
  - Prix du médicament
  - Disponibilité (en stock ou non)
- Indicateur visuel de disponibilité
- Navigation vers les détails de la pharmacie

### Géolocalisation
- Utilisation du GPS de l'appareil
- Calcul précis de la distance (formule Haversine)
- Permission Android et iOS
- Gestion des erreurs de localisation
- Format intelligent de la distance (m/km)

### Détails Pharmacie
- Informations complètes:
  - Nom
  - Adresse complète
  - Numéro de téléphone
  - Note/évaluation
- Actions rapides:
  - Appeler la pharmacie directement
  - Ouvrir l'itinéraire dans Google Maps
- Design professionnel et intuitif

## 🔔 Notifications en Temps Réel

### Centre de Notifications
- Liste de toutes les notifications
- Badge de comptage sur l'onglet
- Distinction visuelle lu/non lu
- Types de notifications:
  - Info (bleu)
  - Avertissement (jaune)
  - Succès (vert)
  - Erreur (rouge)
- Horodatage relatif (il y a X minutes/heures)
- Marquage comme lu au clic

### Push Notifications
- Notifications locales
- Son et vibration
- Affichage même quand l'app est fermée
- Données personnalisées dans la notification
- Canal de notification Android configuré

### WebSocket
- Connexion temps réel avec le serveur
- Reconnexion automatique en cas de déconnexion
- Événements supportés:
  - Nouvelles notifications
  - Mises à jour de prix
  - Changements de statut de commande (préparé)
- Authentification par token JWT

## 👤 Profil Utilisateur

### Informations Utilisateur
- Affichage du profil:
  - Avatar (placeholder)
  - Nom complet ou username
  - Adresse email
- Design professionnel

### Menu de Navigation
- **Compte**:
  - Informations personnelles (préparé)
  - Changer le mot de passe (préparé)
  
- **Commandes** (préparé pour future implémentation):
  - Historique des commandes
  - Commandes en cours
  
- **Préférences**:
  - Notifications (préparé)
  - Langue (préparé)
  
- **Support**:
  - Aide (préparé)
  - À propos de l'application

### Déconnexion
- Confirmation avant déconnexion
- Nettoyage sécurisé de la session
- Suppression du token
- Redirection vers l'écran de connexion

## 🎨 Expérience Utilisateur

### Navigation
- Bottom Tabs pour navigation principale:
  - Accueil (icône maison)
  - Recherche (icône loupe)
  - Notifications (icône cloche + badge)
  - Profil (icône personne)
- Stack Navigation pour les détails
- Animation fluide entre écrans
- Bouton retour natif

### Design
- Palette de couleurs cohérente:
  - Primary: #007AFF (bleu)
  - Success: #4CAF50 (vert)
  - Warning: #FFC107 (jaune)
  - Error: #F44336 (rouge)
  - Background: #F5F5F5 (gris clair)
  - Cards: #FFFFFF (blanc)
- Icons de react-native-vector-icons (Ionicons)
- Ombres et élévations pour la profondeur
- Border radius pour adoucir les éléments

### États de Chargement
- Loading spinner pendant les requêtes
- Messages de chargement appropriés
- Skeleton screens (à implémenter)
- Pull-to-refresh sur les listes

### Gestion des Erreurs
- Messages d'erreur clairs et localisés
- Alerts natifs pour les erreurs critiques
- États vides avec messages explicatifs
- Retry automatique pour erreurs réseau

## 🔄 Fonctionnalités Temps Réel

### Mises à Jour Automatiques
- Prix des médicaments
- Disponibilité en pharmacie
- Statut des commandes (préparé)
- Notifications instantanées

### Synchronisation
- État synchronisé avec le serveur
- Updates via WebSocket
- Fallback sur polling si WebSocket échoue (à implémenter)

## 📱 Compatibilité

### Plateformes
- Android (API 21+, Android 5.0+)
- iOS (iOS 13.0+)

### Permissions
- **Android**:
  - INTERNET
  - ACCESS_FINE_LOCATION
  - ACCESS_COARSE_LOCATION
  - POST_NOTIFICATIONS
  - VIBRATE

- **iOS**:
  - Location When In Use
  - Notifications

## 🚀 Performance

### Optimisations
- Lazy loading des composants
- Memoization pour éviter re-renders
- Pagination des listes
- Cache local avec AsyncStorage
- Images optimisées

### Taille de l'App
- Bundle optimisé
- ProGuard pour Android
- Code splitting (préparé)

## 🔒 Sécurité

### Données
- Token JWT sécurisé
- AsyncStorage chiffré (natif)
- Pas de données sensibles en clair
- Communication HTTPS/WSS uniquement

### Authentification
- OAuth2/OIDC via Keycloak
- Token expiration et refresh
- Logout propre avec nettoyage

### API
- Authentification sur toutes les requêtes
- Gestion des erreurs 401/403
- Retry avec exponential backoff

## 📊 Préparation Future

### Commandes
- Architecture prête pour:
  - Panier d'achat
  - Processus de commande
  - Paiement
  - Confirmation

### Livraison
- WebSocket events configurés pour:
  - Tracking en temps réel
  - Notifications de livraison
  - Mise à jour de statut

### Évolutivité
- Code modulaire et maintenable
- Services séparés par domaine
- Types TypeScript stricts
- Tests unitaires en place
