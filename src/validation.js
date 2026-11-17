export function validerRecette(recette) {
  const erreurs = {};

  if (recette.name.length < 3 || recette.name.length > 60) {
    erreurs.name = "Le nom doit contenir entre 3 et 60 caractères.";
  }

  if (recette.cuisine === "") {
    erreurs.cuisine = "Veuillez saisir le type de cuisine.";
  }

  if (recette.difficulty === "") {
    erreurs.difficulty = "Veuillez sélectionner un niveau de difficulté.";
  }

  if (
    Number.isNaN(recette.prepTimeMinutes) ||
    recette.prepTimeMinutes < 1 ||
    recette.prepTimeMinutes > 300
  ) {
    erreurs.prepTimeMinutes =
      "Le temps de préparation doit être entre 1 et 300 minutes.";
  }

  return erreurs;
}
