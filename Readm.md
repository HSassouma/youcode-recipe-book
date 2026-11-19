# 🍽️ YouCode Recipe Book

Une application web de gestion et de consultation de recettes, développée dans le cadre du sprint JavaScript et DOM avancés de YouCode.

L'application permet aux membres du club cuisine de consulter, rechercher, ajouter et supprimer des recettes à travers une interface simple et intuitive en français.

---

## 📌 1. Présentation du projet

Le club cuisine de YouCode souhaite disposer d'un carnet de recettes en ligne pour faciliter la préparation de ses ateliers.

L'application utilise l'API publique **DummyJSON Recipes** pour récupérer les recettes et effectuer des opérations d'ajout et de suppression.

### Objectifs

- Consulter une liste de recettes.
- Rechercher une recette par mot-clé.
- Ajouter une nouvelle recette avec un formulaire validé.
- Supprimer une recette après confirmation.
- Afficher les messages de chargement, de succès et d'erreur.
- Mettre à jour l'interface sans recharger la page.

## 🛠️ 2. Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure de l'application |
| Tailwind CSS v4 | Mise en forme et design responsive |
| JavaScript Vanilla | Logique et interactions |
| Axios | Communication avec l'API |
| DummyJSON | API publique de recettes |
| Font Awesome | Icônes |
| Vite | Environnement de développement |

**Aucun framework JavaScript n'est utilisé.** Toutes les requêtes HTTP passent par Axios. Aucun `fetch()` n'est utilisé.

## 📂 3. Structure du projet

```text
youcode-recipe-book/
│
├── public/
│   ├── logo.png
│   └── hero.png
│
├── src/
│   ├── main.js
│   ├── api.js
│   ├── validation.js
│   ├── function.js
│   └── style.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Rôle des fichiers

**`api.js`**
- Crée une seule instance Axios avec `axios.create()`.
- Définit la `baseURL` de l'API DummyJSON.
- Configure le délai d'attente (`timeout`).

**`validation.js`**
- Vérifie les informations saisies dans le formulaire.
- Contrôle la longueur du nom.
- Vérifie la cuisine et le niveau de difficulté.
- Vérifie que le temps de préparation est compris entre 1 et 300 minutes.
- Retourne les erreurs de validation.

**`function.js`**
- Contient les fonctions liées aux appels API et à l'affichage.
- Récupère et recherche les recettes.
- Crée et affiche les cartes.
- Ajoute une recette au début de la liste.
- Affiche les messages de succès et d'erreur.
- Gère la suppression avec confirmation.

**`main.js`**
- Initialise l'application.
- Récupère les recettes au démarrage.
- Gère les événements du formulaire et de la recherche.
- Appelle les fonctions de validation et d'affichage.
- Coordonne les différentes fonctionnalités.

**`style.css`**
- Importe Tailwind CSS.
- Contient les styles personnalisés de l'application.

## 🌐 4. Communication avec l'API

L'application utilise l'API DummyJSON :

Documentation : https://dummyjson.com/docs/recipes

### Instance Axios

Une seule instance Axios est créée dans `api.js` :

```js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000
});
```

Toutes les requêtes utilisent cette instance.

### Tableau des requêtes HTTP

| Fonctionnalité | Méthode | URL | Données envoyées |
|---|---|---|---|
| Afficher les recettes | GET | `/recipes?limit=12` | Aucune |
| Rechercher une recette | GET | `/recipes/search?q={query}` | Mot-clé dans l'URL |
| Ajouter une recette | POST | `/recipes/add` | Objet JSON de la recette |
| Supprimer une recette | DELETE | `/recipes/{id}` | ID dans l'URL |

### Exemple de données envoyées avec POST

```json
{
  "name": "Moroccan Couscous",
  "cuisine": "Moroccan",
  "difficulty": "Medium",
  "prepTimeMinutes": 60
}
```

### Réponses de l'API

- **GET** : retourne un objet contenant les recettes.
- **POST** : retourne les informations de la recette ajoutée, notamment son ID.
- **DELETE** : retourne les informations de la recette supprimée.

La carte d'une nouvelle recette est créée à partir de la réponse retournée par le serveur.

## ✅ 5. Fonctionnalités réalisées

### US-01 — Consulter les recettes
- Récupération des recettes depuis DummyJSON.
- Affichage des recettes sous forme de cartes.
- Présentation de la photo, du nom, de la cuisine, de la difficulté et du temps de préparation.
- Affichage du nombre de recettes.

### US-02 — Rechercher une recette
- Recherche par mot-clé.
- Utilisation de l'endpoint `/recipes/search`.
- Affichage des résultats sans rechargement de la page.
- Affichage du message « Aucune recette trouvée » si aucun résultat ne correspond.
- Bouton pour revenir à la liste complète.

### US-03 — Ajouter une recette
- Formulaire d'ajout.
- Validation des champs avant l'envoi.
- Affichage des erreurs sous les champs concernés.
- Envoi des données avec POST.
- Désactivation du bouton pendant l'envoi.
- Ajout de la nouvelle carte au début de la liste.
- Affichage d'un message de succès.

### US-04 — Supprimer une recette
- Bouton de suppression sur chaque carte.
- Demande de confirmation avant la suppression.
- Envoi d'une requête DELETE avec l'ID de la recette.
- Suppression de la carte après la réponse de l'API.
- Affichage d'un message de confirmation.

### US-05 — Gestion des états et des erreurs
- Gestion des requêtes asynchrones avec `async/await`.
- Gestion des erreurs avec `try/catch`.
- Affichage de messages pour informer l'utilisateur en cas d'échec.

## 🧪 6. Scénarios de tests manuels

| N° | Scénario | Résultat attendu |
|---|---|---|
| 1 | Ouvrir l'application | Afficher la liste des recettes |
| 2 | Rechercher une recette existante | Afficher les résultats correspondants |
| 3 | Rechercher un mot-clé inexistant | Afficher « Aucune recette trouvée » |
| 4 | Cliquer sur le bouton de retour | Afficher toutes les recettes |
| 5 | Ajouter une recette valide | Ajouter la carte et afficher un message de succès |
| 6 | Saisir un nom de moins de 3 caractères | Afficher une erreur de validation |
| 7 | Saisir un nom de plus de 60 caractères | Afficher une erreur de validation |
| 8 | Laisser la cuisine vide | Afficher une erreur de validation |
| 9 | Ne pas sélectionner de difficulté | Afficher une erreur de validation |
| 10 | Saisir un temps inférieur à 1 ou supérieur à 300 | Afficher une erreur de validation |
| 11 | Ajouter une recette avec des données invalides | Ne pas envoyer de requête POST |
| 12 | Supprimer une recette et confirmer | Envoyer DELETE et retirer la carte après la réponse |
| 13 | Annuler la confirmation de suppression | Ne pas envoyer de requête DELETE |
| 14 | Simuler une erreur de connexion | Afficher un message d'erreur |

## ⚠️ 7. Limites de l'API DummyJSON

DummyJSON est une API de démonstration.

Les opérations POST et DELETE simulent le comportement d'un vrai serveur, mais **les modifications ne sont pas enregistrées de manière permanente**.

Cela signifie que :

- Une recette ajoutée apparaît dans l'interface après la réponse du serveur.
- Une recette supprimée disparaît de l'interface après la réponse du serveur.
- Après le rechargement de la page, la liste originale de l'API revient.
- Les modifications ne sont pas conservées dans une base de données personnelle.

Cette limite est liée au fonctionnement de l'API DummyJSON et non à un problème de l'application.

## 🚀 8. Installation et lancement

### Prérequis

- Node.js installé.
- npm installé.
- Connexion Internet.

### Installation

Cloner le dépôt :

```bash
git clone https://github.com/VOTRE_USERNAME/VOTRE_REPOSITORY.git
```

Accéder au dossier :

```bash
cd youcode-recipe-book
```

Installer les dépendances :

```bash
npm install
```

Lancer le serveur de développement :

```bash
npm run dev
```

Ouvrir ensuite l'adresse locale affichée dans le terminal.

## 🔗 9. Liens du projet

- **Dépôt GitHub :*https://github.com/HSassouma/youcode-recipe-book*
- **Application GitHub Pages :*https://youcode-recipe-book.vercel.app/* 

## 📸 10. Captures d'écran

Ajouter ici les captures d'écran de l'application :

| Écran | Capture |
|---|---|
| Liste des recettes | `screenshots/recettes.png` |
| État de chargement | `screenshots/loading.png` |
| Message d'erreur | `screenshots/error.png` |
| Aucun résultat | `screenshots/empty-state.png` |
| Formulaire d'ajout | `screenshots/add-recipe.png` |

## 🎓 11. Objectifs pédagogiques

Ce projet m'a permis de pratiquer :

- L'utilisation d'une API REST.
- La configuration et l'utilisation d'Axios.
- Les méthodes HTTP GET, POST et DELETE.
- La programmation asynchrone avec `async/await`.
- La gestion des erreurs avec `try/catch`.
- La validation des formulaires en JavaScript.
- La manipulation du DOM.
- La séparation des responsabilités entre plusieurs fichiers.
- La mise à jour dynamique de l'interface sans rechargement.

---

**Projet réalisé individuellement dans le cadre du sprint JavaScript et DOM avancés — YouCode.**

