# Puzzle-Pharm User Mobile App

Application mobile React Native pour les utilisateurs de Puzzle-Pharm, permettant de rechercher des médicaments, trouver des pharmacies avec prix et distance, et recevoir des notifications en temps réel.

## 🚀 Fonctionnalités

### ✅ Implémentées

- **Authentification sécurisée** via Keycloak
  - Connexion/Déconnexion
  - Inscription utilisateur
  - Gestion des sessions
  - Contrôle d'accès basé sur les rôles

- **Recherche de médicaments**
  - Recherche par nom
  - Affichage détaillé des médicaments
  - Liste des médicaments disponibles

- **Localisation des pharmacies**
  - Liste des pharmacies disponibles avec un médicament
  - Affichage des prix par pharmacie
  - Calcul et affichage de la distance
  - Statut de disponibilité en temps réel
  - Détails complets de chaque pharmacie
  - Navigation GPS vers la pharmacie
  - Appel téléphonique direct

- **Notifications en temps réel**
  - Connexion WebSocket pour les mises à jour instantanées
  - Notifications push locales
  - Gestion des notifications (lecture, affichage)
  - Badge de comptage sur l'onglet notifications

- **Interface utilisateur intuitive**
  - Navigation par onglets (Accueil, Recherche, Notifications, Profil)
  - Design moderne et responsive
  - Animations fluides

### 🔜 Évolutions prévues

- **Livraison de médicaments**
  - Commande en ligne
  - Choix du mode de livraison
  - Suivi de livraison en temps réel

- **Gestion des commandes**
  - Historique des commandes
  - Statut des commandes en cours
  - Notifications de suivi

## 📋 Prérequis

- Node.js >= 16
- React Native CLI
- Android Studio (pour Android) ou Xcode (pour iOS)
- Un émulateur Android/iOS ou un appareil physique

## 🛠️ Installation

1. **Cloner le repository**
```bash
git clone https://github.com/youss-uiux/puzzle-pharm-user.git
cd puzzle-pharm-user
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration iOS (macOS uniquement)**
```bash
cd ios && pod install && cd ..
```

4. **Configuration de l'environnement**

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```env
API_BASE_URL=https://api.puzzle-pharm.com
WEBSOCKET_URL=wss://api.puzzle-pharm.com
KEYCLOAK_URL=https://auth.puzzle-pharm.com
KEYCLOAK_REALM=puzzle-pharm
KEYCLOAK_CLIENT_ID=puzzle-pharm-user-app
KAFKA_BROKERS=localhost:9092
```

## 🚀 Lancement de l'application

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Mode développement
```bash
npm start
```

## 🏗️ Architecture

### Structure du projet

```
puzzle-pharm-user/
├── src/
│   ├── components/       # Composants réutilisables
│   ├── config/          # Configuration (API, constantes)
│   ├── context/         # Context API (Auth, Notifications)
│   ├── navigation/      # Navigation (Auth, Main)
│   ├── screens/         # Écrans de l'application
│   │   ├── Auth/       # Écrans d'authentification
│   │   └── Main/       # Écrans principaux
│   ├── services/        # Services API et logique métier
│   ├── types/          # Types TypeScript
│   └── utils/          # Utilitaires
├── App.tsx             # Point d'entrée de l'application
├── index.js           # Point d'entrée React Native
└── package.json       # Dépendances et scripts
```

### Technologies utilisées

- **React Native 0.72.6** - Framework mobile
- **TypeScript** - Typage statique
- **React Navigation** - Navigation
- **Axios** - Client HTTP pour les requêtes API
- **Socket.io-client** - WebSocket pour les notifications temps réel
- **Keycloak** - Authentification et gestion des rôles
- **React Native Geolocation** - Localisation GPS
- **React Native Push Notification** - Notifications push
- **AsyncStorage** - Stockage local

## 🔌 Intégration Backend

L'application communique avec un backend réactif via :

- **API REST** : Pour les opérations CRUD (médicaments, pharmacies, utilisateurs)
- **WebSocket** : Pour les notifications et mises à jour en temps réel
- **Kafka** : Pour le traitement asynchrone des événements (côté serveur)
- **Keycloak** : Pour l'authentification et la gestion des rôles

### Endpoints principaux

```typescript
// Authentification
POST /auth/login
POST /auth/register
POST /auth/logout

// Médicaments
GET /medications/search?q={query}
GET /medications/{id}
GET /medications

// Pharmacies
GET /pharmacies/nearby?lat={lat}&lng={lng}
GET /pharmacies/{id}

// Prix
GET /prices/medication/{medicationId}?lat={lat}&lng={lng}

// Notifications
GET /notifications
POST /notifications/read/{id}
```

## 🧪 Tests

```bash
npm test
```

## 🔍 Linting

```bash
npm run lint
```

## 📱 Captures d'écran

*(À ajouter après le déploiement)*

## 🔒 Sécurité

- Authentification JWT via Keycloak
- Tokens stockés de manière sécurisée dans AsyncStorage
- Gestion automatique du rafraîchissement des tokens
- Contrôle d'accès basé sur les rôles (RBAC)
- Communication sécurisée via HTTPS/WSS

## 🌐 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Contributeurs

- Équipe Puzzle-Pharm

## 🗺️ Roadmap

- [x] Authentification Keycloak
- [x] Recherche de médicaments
- [x] Liste des pharmacies avec prix et distance
- [x] Notifications en temps réel (WebSocket)
- [x] Navigation GPS
- [ ] Système de commande en ligne
- [ ] Livraison à domicile
- [ ] Suivi des commandes en temps réel
- [ ] Historique des commandes
- [ ] Système de notation des pharmacies
- [ ] Chat en temps réel avec les pharmaciens
- [ ] Programme de fidélité 
