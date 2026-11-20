
import {
  afficherCard,
  afficherForm,
  fermerForm,
  getRecette,
  rechercherRecette,
  ajouterRecette,
  ajouterCardAuDebut,
  afficherErreurs,
  afficherMessageSucces,
  afficherMessageErreur,
  cacherMessageErreur,
  afficherErreurFormulaire,
  cacherErreurFormulaire,
  afficherAucuneRecette,
  afficherChargement,
  cacherChargement,
  afficherErreurChargement,
  cacherErreurChargement,
  getMessageErreur,
  confirmRecette
} from "./function.js";

import { validerRecette } from "./validation.js";
import "./style.css";

async function chargerRecettes() {
  cacherMessageErreur();
  cacherErreurChargement();
  afficherChargement("Chargement des recettes...");

  try {
    const data = await getRecette();
    afficherCard(data.recipes);
  } catch (error) {
    document.querySelector("#contener_recette").innerHTML = "";
    document.querySelector("#nombre_recettes").textContent = "0 recettes";
    afficherErreurChargement(getMessageErreur(error));
  } finally {
    cacherChargement();
  }
}

// Affichage initial des recettes
await chargerRecettes();

// Nouvel essai après une erreur de chargement
document.querySelector("#btn_reessayer").addEventListener("click", chargerRecettes);

// Activation de la suppression
confirmRecette();

// Recherche des recettes
const input = document.querySelector("#recherche");

input.addEventListener("input", async () => {
  const query = input.value.trim();

  cacherMessageErreur();
  cacherErreurChargement();
  afficherChargement(
    query === "" ? "Chargement des recettes..." : "Recherche en cours...",
  );

  try {
    const data =
      query === "" ? await getRecette() : await rechercherRecette(query);

    if (data.recipes.length === 0) {
      afficherAucuneRecette();
      return;
    }

    afficherCard(data.recipes);
  } catch (error) {
    afficherMessageErreur(getMessageErreur(error));
  } finally {
    cacherChargement();
  }
});

// Ouverture du formulaire
const ajouterbtn = document.getElementById("ajouter");
ajouterbtn.addEventListener("click", afficherForm);

// Fermeture du formulaire
const Xform = document.getElementById("fermer_form");
const btnFermer = document.getElementById("annuler_form");

Xform.addEventListener("click", fermerForm);
btnFermer.addEventListener("click", fermerForm);

// Ajout d'une recette
const formRecette = document.querySelector("#form_recette");
const btnAjouter = document.querySelector("#btn_ajouter_recette");

formRecette.addEventListener("submit", async (event) => {
  event.preventDefault();
  cacherErreurFormulaire();

  const recette = {
    name: document.querySelector("#nom").value.trim(),
    cuisine: document.querySelector("#cuisine").value.trim(),
    difficulty: document.querySelector("#difficulte").value,
    prepTimeMinutes: Number(document.querySelector("#temps").value),
  };

  const erreurs = validerRecette(recette);
  afficherErreurs(erreurs);

  if (
    erreurs.name ||
    erreurs.cuisine ||
    erreurs.difficulty ||
    erreurs.prepTimeMinutes
  ) {
    return;
  }

  const contenuBouton = btnAjouter.innerHTML;
  btnAjouter.disabled = true;
  btnAjouter.innerHTML =
    '<i class="fa-solid fa-spinner animate-spin mr-2"></i>Ajout en cours...';

  try {
    const nouvelleRecette = await ajouterRecette(recette);

    if (!nouvelleRecette.image) {
      nouvelleRecette.image = "/hero.png";
    }

    ajouterCardAuDebut(nouvelleRecette);
    afficherMessageSucces("La recette a été ajoutée avec succès.");

    formRecette.reset();
    fermerForm();

  } catch (error) {
    afficherErreurFormulaire(getMessageErreur(error));

  } finally {
    btnAjouter.innerHTML = contenuBouton;
    btnAjouter.disabled = false;
  }
});
