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
git clone https://github.com/johannacode/yourban.git
cd cinescope
```

### 2. Lancer le backend
```bash
cd backend
npm install
npm run dev
```

### 3. Lancer le frontend
```bash
cd frontend
npm install
npm run dev
```
L'application démarre sur http://localhost:5173

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
├── shared/
|    └── types/ 
        └── movie.ts      # Type Movie partagé frontend/backend
└── data/
    └── movies.json   # Source de données (200 films, 2022–2024)
```
---
## API REST : Endpoints

| Méthode | Route        | Description                         |
|----------|--------------|-------------------------------------|
| GET      | `/movies`    | Récupère tous les films             |
| GET      | `/movies/:id`| Récupère un film par son ID         |
| POST     | `/movies`    | Crée un nouveau film                |
| PUT      | `/movies/:id`| Modifie un film existant            |
| DELETE   | `/movies/:id`| Supprime un film                    |
---

## Moteur de recommandation

### Principe

Sur la page détail de chaque film, l'application affiche **3 films similaires** calculés grâce à un algorithme de score de similarité basé sur plusieurs critères.

---

## Calcul du score

Le score final est calculé sur **100 points**.

| Critère | Poids | Méthode |
|----------|--------|----------|
| Genre identique | 50 pts | Égalité stricte entre les genres |
| Proximité des recettes | 30 pts | `30 × (1 - écart / recette_max)` |
| Proximité de la note presse | 20 pts | `20 × (1 - écart_note / 10)` |

### Formule simplifié

```bash
if (film.genre === cible.genre) score += 50

const ecartRecettes = Math.abs(film.recettes - cible.recettes)
score += 30 * (1 - ecartRecettes / recetteMax)

if (film.note !== null && cible.note !== null) {
  score += 20 * (1 - Math.abs(film.note - cible.note) / 10)
}
```

---

## Pourquoi cet algorithme ?

### Genre (50 pts)

Le genre est le critère le plus important, car c’est généralement le premier filtre naturel utilisé par les spectateurs lorsqu’ils recherchent un film similaire.

Exemple : une personne qui apprécie un film de science-fiction cherchera souvent un autre film du même univers ou du même style.

---

### Recettes (30 pts)

Les recettes permettent d’estimer la popularité et l’ampleur de la production.

Deux films ayant des budgets ou des performances commerciales proches ont souvent :
- une mise en scène comparable,
- des ambitions similaires,
- un public cible proche.

---

### Note presse (20 pts)

La note presse agit comme un critère d’ajustement final.

Elle permet de rapprocher des films ayant un niveau de qualité perçu similaire selon les critiques spécialisées.


*README mis à jour au fur et à mesure de l'avancement du projet.*