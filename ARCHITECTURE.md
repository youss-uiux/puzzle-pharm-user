# Architecture Puzzle-Pharm User App

## Vue d'ensemble

L'application Puzzle-Pharm User est une application mobile React Native qui permet aux utilisateurs de rechercher des médicaments et de trouver des pharmacies à proximité avec les prix et la disponibilité en temps réel.

## Architecture Technique

### Stack Technologique

- **Frontend**: React Native 0.72.6 avec TypeScript
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **State Management**: React Context API
- **API Client**: Axios
- **Real-time**: Socket.io (WebSocket)
- **Authentication**: Keycloak (OAuth2/OIDC)
- **Storage**: AsyncStorage
- **Location**: React Native Geolocation Service
- **Notifications**: React Native Push Notification

### Structure des Dossiers

```
src/
├── components/          # Composants réutilisables (à venir)
├── config/             # Configuration de l'application
│   └── api.config.ts   # URLs et endpoints API
├── context/            # React Context pour state global
│   ├── AuthContext.tsx # Gestion authentification
│   └── NotificationContext.tsx # Gestion notifications
├── navigation/         # Configuration navigation
│   ├── AuthNavigator.tsx # Navigation auth (login/register)
│   └── MainNavigator.tsx # Navigation principale (tabs)
├── screens/           # Écrans de l'application
│   ├── Auth/         # Écrans authentification
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   └── Main/         # Écrans principaux
│       ├── HomeScreen.tsx
│       ├── SearchScreen.tsx
│       ├── PharmacyListScreen.tsx
│       ├── PharmacyDetailScreen.tsx
│       ├── NotificationsScreen.tsx
│       └── ProfileScreen.tsx
├── services/         # Services et logique métier
│   ├── api.service.ts          # Client HTTP générique
│   ├── auth.service.ts         # Service authentification
│   ├── medication.service.ts   # Service médicaments
│   ├── pharmacy.service.ts     # Service pharmacies
│   ├── websocket.service.ts    # Service WebSocket
│   └── notification.service.ts # Service notifications
├── types/           # Types TypeScript
│   └── index.ts     # Définitions types globaux
└── utils/           # Utilitaires
    ├── location.ts  # Utilitaires géolocalisation
    └── format.ts    # Utilitaires formatage
```

## Flux de Données

### 1. Authentification

```
User -> LoginScreen -> AuthService -> Keycloak API
                          ↓
                    AsyncStorage (token)
                          ↓
                    AuthContext (user state)
                          ↓
                    MainNavigator (routing)
```

### 2. Recherche de Médicaments

```
User -> SearchScreen -> MedicationService -> Backend API
                             ↓
                        Results Display
                             ↓
                    PharmacyListScreen (avec localisation)
```

### 3. Notifications en Temps Réel

```
Backend Event -> Kafka -> WebSocket Server
                              ↓
                    WebSocketService (Socket.io)
                              ↓
                    NotificationContext
                              ↓
                    Local Push Notification
                              ↓
                    NotificationsScreen (UI update)
```

## Patterns Utilisés

### 1. Context API Pattern
- **AuthContext**: Gère l'état d'authentification global
- **NotificationContext**: Gère les notifications

### 2. Service Layer Pattern
- Séparation de la logique métier des composants UI
- Services réutilisables (API, Auth, Medications, etc.)

### 3. Repository Pattern (implicite)
- Services agissent comme repositories
- Abstraction de l'accès aux données

### 4. Observer Pattern
- WebSocket pour les événements temps réel
- Context API pour les changements d'état

## Sécurité

### Authentification
- JWT tokens via Keycloak
- Tokens stockés dans AsyncStorage
- Auto-refresh des tokens
- Intercepteurs Axios pour l'authentification

### Communications
- HTTPS pour API REST
- WSS pour WebSocket
- Validation côté client et serveur

### Permissions
- RBAC (Role-Based Access Control) via Keycloak
- Vérification des rôles avant actions sensibles

## Performance

### Optimisations
- Lazy loading des écrans
- Memoization avec React.memo (à implémenter)
- Pagination des listes
- Cache local avec AsyncStorage

### Stratégies de Chargement
- Loading states dans tous les écrans
- Pull-to-refresh sur les listes
- Skeleton screens (à implémenter)

## Gestion des Erreurs

### Niveaux
1. **UI Level**: Alert/Toast pour erreurs utilisateur
2. **Service Level**: Console.error + propagation
3. **API Level**: Intercepteurs Axios

### Stratégies
- Retry automatique pour erreurs réseau
- Messages d'erreur localisés
- Fallback UI pour états d'erreur

## Tests

### Structure
```
__tests__/
├── services/
│   └── medication.service.test.ts
└── App.test.tsx
```

### Couverture
- Tests unitaires des services
- Tests de composants React
- Tests d'intégration (à venir)

## Évolution Prévue

### Phase 2: Commandes et Livraison
```
Nouvelles fonctionnalités:
- Service de commande (order.service.ts)
- Écrans de commande
- Suivi en temps réel via WebSocket
- Historique des commandes
```

### Architecture Future
```
src/
├── features/           # Feature-based organization
│   ├── auth/
│   ├── medications/
│   ├── pharmacies/
│   ├── orders/        # Nouveau module
│   └── delivery/      # Nouveau module
├── shared/            # Code partagé
│   ├── components/
│   ├── hooks/
│   └── utils/
└── store/            # Redux (si nécessaire)
```

## Intégration Backend

### API REST
- **Base URL**: Configurable via .env
- **Authentification**: Bearer token
- **Format**: JSON

### WebSocket
- **Connexion**: Socket.io
- **Événements**:
  - `notification`: Nouvelles notifications
  - `price_update`: Mises à jour prix
  - `order_status`: Statut commandes

### Kafka (Backend)
- L'app ne communique pas directement avec Kafka
- Kafka traite les événements côté serveur
- WebSocket reçoit les résultats

## Déploiement

### Android
1. Build: `npm run android`
2. Release: Generate signed APK/AAB
3. Store: Google Play Store

### iOS
1. Build: `npm run ios`
2. Release: Archive & upload
3. Store: Apple App Store

## Monitoring

### Logs
- Console.log en développement
- Service de logging centralisé (à implémenter)

### Analytics
- Tracking des actions utilisateur (à implémenter)
- Métriques de performance (à implémenter)

## Documentation API

Voir le fichier README.md pour la liste complète des endpoints API.

## Contributeurs

Pour contribuer:
1. Fork le projet
2. Créer une branche feature
3. Suivre les conventions de code
4. Ajouter des tests
5. Soumettre une PR

## License

MIT License - voir LICENSE file
