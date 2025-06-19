# 🎁 Loomi Frontend

Loomi est une application React moderne de livraison de boîtes surprise par abonnement. Ce repository contient l'interface utilisateur développée avec React 18, Vite et Tailwind CSS.

## 📋 Table des matières

- [Architecture](#-architecture)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Tests](#-tests)
- [Structure du projet](#-structure-du-projet)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)

## 🏗 Architecture

Le frontend Loomi utilise une stack moderne :

- **React 18** - Bibliothèque UI avec hooks
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Navigation SPA
- **Context API** - Gestion d'état globale
- **Axios** - Client HTTP pour l'API

### Fonctionnalités principales

- 🔐 **Authentification** (inscription, connexion, profil)
- 📦 **Catalogue de boîtes** avec détails et avis
- 🛒 **Système de commandes** (unitaires et abonnements)
- 🎁 **Cartes cadeaux** (achat et activation)
- 🚚 **Suivi des livraisons**
- ⭐ **Système d'avis** clients
- 👑 **Interface d'administration**
- 📱 **Design responsive**

## 🔧 Prérequis

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **Backend Loomi** en cours d'exécution (port 8000)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone http://dev-loomi.data-flow.fr/loomi/loomi-front.git
cd loomi
```

### 2. Installer les dépendances

```bash
# Avec npm
npm install
```

### 3. Configuration de l'environnement

```bash
# Copier le fichier d'environnement
cp .env.example .env.local
```

Modifier le fichier `.env.local` :

```env
# URL de l'API backend
VITE_API_URL=http://localhost:8000/api

# URL de base pour les images
VITE_BASE_URL=http://localhost:8000

# Mode de développement
VITE_APP_ENV=development
```

## ⚙️ Configuration

### Variables d'environnement

```env
# .env.local
VITE_API_URL=http://localhost:8000/api
VITE_BASE_URL=http://localhost:8000
VITE_APP_ENV=development
VITE_APP_NAME=Loomi
```

### Configuration Tailwind

Le projet utilise Tailwind CSS avec une configuration personnalisée :

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color'
      }
    }
  }
}
```

## 🎯 Utilisation

### Démarrer le serveur de développement

```bash
# Avec npm
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Scripts disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de dev

# Build
npm run build        # Build de production
npm run preview      # Prévisualiser le build

# Linting
npm run lint         # ESLint
npm run lint:fix     # Corriger automatiquement
```

### Avec le backend

⚠️ **Important** : Ce frontend nécessite le backend Loomi pour fonctionner.

**Setup complet :**

1. **Backend** (Terminal 1) :
   ```bash
   cd loomi-server
   php artisan serve
   # → http://localhost:8000
   ```

2. **Frontend** (Terminal 2) :
   ```bash
   cd loomi
   npm run dev
   # → http://localhost:5173
   ```

3. **Accéder à l'application** : `http://localhost:5173`

## 📁 Structure du projet

```
loomi/
├── public/
│   ├── images/              # Assets statiques
│   └── favicon.svg
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── home/           # Composants de la page d'accueil
│   │   ├── addOns/         # Add-ons et extensions
│   │   └── ...
│   ├── pages/              # Pages principales
│   │   ├── About.jsx
│   │   ├── Boxes.jsx
│   │   ├── Orders.jsx
│   │   └── ...
│   ├── context/            # Contexts React
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   ├── hooks/              # Hooks personnalisés
│   │   └── useFavorites.js
│   ├── api/                # Configuration API
│   │   └── index.js
│   ├── assets/             # Assets du projet
│   ├── App.jsx             # Composant racine
│   └── main.jsx           # Point d'entrée
├── tailwind.config.js      # Configuration Tailwind
├── vite.config.js         # Configuration Vite
└── package.json           # Dépendances et scripts
```

### Composants principaux

- **`App.jsx`** - Routeur principal et layout
- **`Navbar.jsx`** - Navigation responsive
- **`CartContext.jsx`** - Gestion du panier
- **`PrivateRoute.jsx`** - Protection des routes
- **`BoxCard.jsx`** - Carte produit réutilisable

### Pages principales

- **`/`** - Page d'accueil avec hero et sections
- **`/boxes`** - Catalogue des boîtes
- **`/order`** - Processus de commande
- **`/subscription`** - Gestion de l'abonnement
- **`/deliveries`** - Historique des livraisons
- **`/gift-cards`** - Cartes cadeaux

## 🔗 Liens utiles

- [Backend Loomi](http://dev-loomi.data-flow.fr/loomi/loomi-server.git) - API Laravel
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**⚠️ Note importante** : Ce frontend doit être utilisé conjointement avec le backend Loomi Laravel pour une expérience complète.

## Auteur

Boutrois Benjamin