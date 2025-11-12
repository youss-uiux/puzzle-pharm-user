# Guide de Contribution

Merci de votre intérêt pour contribuer à Puzzle-Pharm User App!

## Code de Conduite

Soyez respectueux et professionnel dans toutes vos interactions.

## Comment Contribuer

### 1. Signaler des Bugs

Créez une issue avec:
- Description claire du problème
- Étapes pour reproduire
- Comportement attendu vs réel
- Captures d'écran si applicable
- Environnement (OS, version React Native, etc.)

### 2. Proposer des Fonctionnalités

Créez une issue avec:
- Description de la fonctionnalité
- Cas d'usage
- Bénéfices attendus
- Proposition d'implémentation (optionnel)

### 3. Soumettre du Code

#### Setup

```bash
# Fork et clone
git clone https://github.com/your-username/puzzle-pharm-user.git
cd puzzle-pharm-user

# Install dependencies
npm install

# Créer une branche
git checkout -b feature/ma-fonctionnalite
```

#### Développement

1. **Code Style**
   - Suivre les règles ESLint
   - Utiliser TypeScript strictement typé
   - Commenter le code complexe

2. **Commits**
   - Messages clairs et descriptifs
   - Format: `type(scope): description`
   - Exemples:
     - `feat(search): add filter by category`
     - `fix(auth): resolve token refresh issue`
     - `docs(readme): update installation steps`

3. **Tests**
   - Ajouter des tests pour nouveau code
   - Assurer que tous les tests passent
   - Viser une couverture > 80%

```bash
npm test
```

4. **Linting**
   - Corriger toutes les erreurs de lint

```bash
npm run lint
```

#### Pull Request

1. Push vers votre fork
```bash
git push origin feature/ma-fonctionnalite
```

2. Créer la PR sur GitHub
3. Remplir le template de PR
4. Lier les issues concernées
5. Attendre la review

### Guidelines de Code

#### TypeScript

```typescript
// ✅ Bon
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User> => {
  // ...
};

// ❌ Mauvais
const getUser = async (id: any): Promise<any> => {
  // ...
};
```

#### React Components

```typescript
// ✅ Bon
interface Props {
  title: string;
  onPress: () => void;
}

const MyComponent: React.FC<Props> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

// ❌ Mauvais
const MyComponent = (props: any) => {
  // ...
};
```

#### Services

```typescript
// ✅ Bon
class MyService {
  async getData(): Promise<Data[]> {
    try {
      const response = await apiService.get<Data[]>('/endpoint');
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default new MyService();
```

#### Styling

```typescript
// ✅ Bon - StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
});

// ❌ Mauvais - Inline styles
<View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
```

### Structure des Fichiers

```
src/
├── feature/
│   ├── FeatureScreen.tsx      # Écran
│   ├── FeatureService.ts      # Service
│   ├── FeatureTypes.ts        # Types (si nécessaire)
│   └── __tests__/
│       └── Feature.test.tsx   # Tests
```

### Naming Conventions

- **Fichiers**: PascalCase pour composants, camelCase pour services
- **Composants**: PascalCase
- **Fonctions**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Interfaces**: PascalCase avec 'I' prefix optionnel
- **Types**: PascalCase

### Documentation

- Documenter les fonctions complexes
- Mettre à jour README.md si nécessaire
- Ajouter des commentaires JSDoc pour les APIs publiques

```typescript
/**
 * Recherche des médicaments par nom
 * @param query - Terme de recherche
 * @returns Liste des médicaments trouvés
 * @throws {Error} Si la recherche échoue
 */
async searchMedications(query: string): Promise<Medication[]> {
  // ...
}
```

### Review Process

1. Un reviewer sera assigné
2. Adresser les commentaires de review
3. Push les modifications
4. Attendre l'approbation
5. Merge par un mainteneur

### Questions?

Ouvrez une issue avec le tag `question`.

## Licence

En contribuant, vous acceptez que vos contributions soient sous licence MIT.
