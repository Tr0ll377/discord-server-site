# Discord Server Site

Un site communautaire pour un serveur Discord avec :

- section d'accueil
- FAQ / questions fréquentes
- actualités / nouveautés
- suggestions avec système de votes
- liens vers YouTube, Instagram et autres réseaux
- authentification Discord pour poster et voter
- base de données MongoDB

## Stack

- Frontend : React + Vite
- Backend : Node.js + Express
- Base de données : MongoDB
- Authentification : Discord OAuth2

## Structure du projet

- `client/` : site frontend
- `server/` : API backend

## Configuration rapide

1. Copier le fichier `.env.example` en `.env` à la racine du projet
2. Compléter les variables de votre Discord et MongoDB
3. Lancer les dépendances :

```bash
npm install
```

4. Démarrer le projet en dev :

```bash
npm run dev
```

Le frontend est disponible sur http://localhost:5173 et l'API sur http://localhost:5000.

## Variables d'environnement

```env
PORT=5000
CLIENT_URL=http://localhost:5173
SESSION_SECRET=votre_secret_très_long
MONGODB_URI=mongodb://127.0.0.1:27017/discord-server-site
DISCORD_CLIENT_ID=votre_client_id
DISCORD_CLIENT_SECRET=votre_client_secret
DISCORD_CALLBACK_URL=http://localhost:5000/auth/discord/callback
```

## Authentification Discord

1. Créer une application sur https://discord.com/developers/applications
2. Ajouter un `Redirect` avec l'URL :
   `http://localhost:5000/auth/discord/callback`
3. Copier le `Client ID` et le `Client Secret`

## Fonctionnalités

- FAQ modifiable dans la base de données
- Nouveautés publiées depuis l'API
- Suggestions soumises par les utilisateurs connectés
- Vote sur les suggestions
- Login/logout via Discord

## Exemple de production

Pour le déploiement, vous pouvez déployer le backend sur Railway / Render / VPS et le frontend sur Vercel ou via le build static servi par le backend.

## Auteurs

Projet prêt à personnaliser selon votre serveur Discord.
