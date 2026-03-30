# BREACH // Challenge CTF

Un mini CTF (Capture The Flag) web avec un thème immersif d'incident cyber.

## Lancement rapide

```bash
# Installer toutes les dépendances (racine + client + serveur)
npm run install:all

# Lancer le client et le serveur
npm run dev
```

- **Frontend** : http://localhost:5173
- **Backend** : http://localhost:3001

## Structure du projet

```
Challenge48h/
├── client/                  # Frontend React + Vite + Tailwind
│   ├── src/
│   │   ├── components/      # Composants UI réutilisables
│   │   ├── pages/           # Pages (Home, Challenge1, Hidden, FinalStep, Validate)
│   │   ├── App.jsx          # Configuration du routeur
│   │   ├── main.jsx         # Point d'entrée
│   │   └── index.css        # Styles globaux + Tailwind
│   ├── index.html
│   └── vite.config.js
├── server/                  # API Express
│   └── index.js
└── package.json             # Scripts racine
```

## Déroulement du challenge

1. **Accueil** — Briefing immersif sur l'incident
2. **Challenge 1** — Décoder un payload doublement encodé en Base64 (mène à un faux flag)
3. **/hidden** — Trouvé via l'inspection du code source HTML ; contient un faux flag + indice discret
4. **/final-step** — Simulation de terminal avec le vrai code d'accès caché dans le HTML
5. **Validation** — Soumettre le code pour révéler le vrai flag
