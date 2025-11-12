# Guide de Configuration Détaillé

Ce guide vous accompagne dans la mise en place complète de l'application Puzzle-Pharm User.

## Prérequis Système

### Outils Obligatoires

1. **Node.js** (version 16 ou supérieure)
   ```bash
   node --version  # Doit afficher v16.x.x ou supérieur
   ```

2. **npm** ou **yarn**
   ```bash
   npm --version
   ```

3. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

4. **Watchman** (recommandé pour macOS/Linux)
   ```bash
   # macOS
   brew install watchman
   
   # Linux
   # Suivre les instructions sur https://facebook.github.io/watchman/docs/install
   ```

### Pour Android

1. **Android Studio**
   - Télécharger depuis https://developer.android.com/studio
   - Installer Android SDK (API 33 minimum)
   - Configurer Android SDK Tools
   - Créer un AVD (Android Virtual Device)

2. **Java Development Kit (JDK 11)**
   ```bash
   java -version  # Doit afficher version 11.x
   ```

3. **Variables d'environnement**
   ```bash
   # Ajouter à ~/.bashrc ou ~/.zshrc
   export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
   export ANDROID_HOME=$HOME/Android/Sdk          # Linux
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

### Pour iOS (macOS uniquement)

1. **Xcode** (version 13 ou supérieure)
   - Télécharger depuis l'App Store
   - Installer Command Line Tools:
     ```bash
     xcode-select --install
     ```

2. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

## Installation du Projet

### 1. Cloner le Repository

```bash
git clone https://github.com/youss-uiux/puzzle-pharm-user.git
cd puzzle-pharm-user
```

### 2. Installer les Dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration iOS (macOS uniquement)

```bash
cd ios
pod install
cd ..
```

### 4. Configuration de l'Environnement

Créer un fichier `.env` à la racine du projet:

```bash
cp .env.example .env
```

Éditer le fichier `.env` avec vos valeurs:

```env
# API Configuration
API_BASE_URL=https://api.puzzle-pharm.com
WEBSOCKET_URL=wss://api.puzzle-pharm.com

# Keycloak Configuration
KEYCLOAK_URL=https://auth.puzzle-pharm.com
KEYCLOAK_REALM=puzzle-pharm
KEYCLOAK_CLIENT_ID=puzzle-pharm-user-app

# Kafka Configuration (Backend only)
KAFKA_BROKERS=localhost:9092
```

## Lancement de l'Application

### Mode Développement

1. **Démarrer Metro Bundler**
   ```bash
   npm start
   # ou
   yarn start
   ```

2. **Dans un nouveau terminal, lancer l'application:**

   **Android:**
   ```bash
   npm run android
   # ou
   yarn android
   ```

   **iOS:**
   ```bash
   npm run ios
   # ou
   yarn ios
   ```

### Résolution des Problèmes Courants

#### Erreur: "Unable to resolve module"

```bash
# Nettoyer le cache
npm start -- --reset-cache

# ou pour Metro
npx react-native start --reset-cache
```

#### Erreur Android: "SDK location not found"

Créer `android/local.properties`:
```properties
sdk.dir=/Users/USERNAME/Library/Android/sdk  # macOS
# ou
sdk.dir=/home/USERNAME/Android/Sdk            # Linux
```

#### Erreur iOS: "Command PhaseScriptExecution failed"

```bash
cd ios
pod deintegrate
pod install
cd ..
```

#### Erreur: "EMFILE: too many open files"

macOS:
```bash
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
```

## Débogage

### React Native Debugger

1. **Installer React Native Debugger**
   ```bash
   brew install --cask react-native-debugger  # macOS
   ```

2. **Lancer le debugger**
   - Ouvrir React Native Debugger
   - Dans l'app, secouer l'appareil/émulateur
   - Sélectionner "Debug"

### Chrome DevTools

1. Dans l'app, secouer l'appareil
2. Sélectionner "Debug"
3. Ouvrir Chrome: `http://localhost:8081/debugger-ui/`

### Logs en Temps Réel

**Android:**
```bash
npx react-native log-android
```

**iOS:**
```bash
npx react-native log-ios
```

## Tests

### Lancer Tous les Tests

```bash
npm test
# ou
yarn test
```

### Tests en Mode Watch

```bash
npm test -- --watch
```

### Couverture de Code

```bash
npm test -- --coverage
```

## Linting et Formatage

### Linter

```bash
npm run lint
```

### Auto-fix

```bash
npm run lint -- --fix
```

### Format avec Prettier

```bash
npx prettier --write "src/**/*.{ts,tsx}"
```

## Build de Production

### Android

1. **Générer une clé de signature**
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configuration Gradle**
   
   Éditer `android/gradle.properties`:
   ```properties
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=*****
   MYAPP_RELEASE_KEY_PASSWORD=*****
   ```

3. **Build APK**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   
   APK disponible dans: `android/app/build/outputs/apk/release/`

4. **Build AAB (Google Play)**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

### iOS

1. **Ouvrir dans Xcode**
   ```bash
   open ios/PuzzlePharmUser.xcworkspace
   ```

2. **Configuration**
   - Sélectionner votre équipe de développement
   - Configurer Bundle Identifier
   - Configurer Signing & Capabilities

3. **Archive**
   - Product > Archive
   - Suivre le processus d'upload vers App Store Connect

## Configuration Backend

L'application nécessite un backend opérationnel avec:

### Endpoints Requis

- `/auth/login` - Authentification
- `/auth/register` - Inscription
- `/medications/search` - Recherche médicaments
- `/pharmacies/nearby` - Pharmacies à proximité
- `/prices/medication/:id` - Prix par médicament
- `/notifications` - Liste notifications

### WebSocket

Le serveur WebSocket doit supporter:
- Connexion authentifiée avec JWT
- Événements: `notification`, `price_update`, `order_status`

### Keycloak

Configuration Keycloak requise:
1. Créer un realm `puzzle-pharm`
2. Créer un client `puzzle-pharm-user-app`
3. Configurer les rôles utilisateur
4. Activer Direct Access Grants

## Monitoring et Logs

### En Production

Configurer des services de monitoring:
- **Sentry** pour les erreurs
- **Firebase Analytics** pour les statistiques
- **Firebase Crashlytics** pour les crashes

### Installation Sentry (exemple)

```bash
npm install @sentry/react-native
```

Suivre la documentation Sentry pour la configuration complète.

## Support

Pour toute question:
1. Consulter la documentation: README.md, ARCHITECTURE.md
2. Ouvrir une issue sur GitHub
3. Contacter l'équipe de développement

## Ressources Utiles

- [Documentation React Native](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Checklist de Déploiement

- [ ] Tests unitaires passent
- [ ] Linting sans erreurs
- [ ] Build production réussit
- [ ] Variables d'environnement configurées
- [ ] Backend accessible
- [ ] Keycloak configuré
- [ ] WebSocket fonctionnel
- [ ] Permissions Android/iOS configurées
- [ ] Icons et splash screen ajoutés
- [ ] Documentation à jour
