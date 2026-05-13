# Yourban CineScope

Application web d'exploration de films de box-office (2022–2024).

**Stack :** React · TypeScript · Express · Node.js

---

## Prérequis

- Node.js v18+
- npm v9+

---

## Installation

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd cinescope
```

### 2. Installer les dépendances backend
```bash
cd backend
npm install
```

---

## Structure du projet

```plaintext
cinescope/
├── backend/          # Serveur Express + API REST
│   └── src/
│       ├── routes/       # Définition des endpoints
│       ├── controllers/  # Logique métier
│       ├── services/     # Accès aux données
│       └── middlewares/  # Validation, gestion d'erreurs
├── frontend/         # Application React + TypeScript
│   └── src/
│       ├── components/   # Briques UI réutilisables
│       ├── pages/        # Vues complètes
│       ├── hooks/        # Logique React réutilisable
│       ├── services/     # Appels API
│       └── types/        # Interfaces TypeScript
└── data/
    └── movies.json   # Source de données (200 films, 2022–2024)
```

---

*README mis à jour au fur et à mesure de l'avancement du projet.*