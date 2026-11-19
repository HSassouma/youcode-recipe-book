import { api } from "./api.js";
export async function getRecette() {
  const responce = await api.get("/recipes?limit=15");
  console.log(responce.data);
  return responce.data;
}

function creerCard(recette) {
  const card = document.createElement("div");
  card.innerHTML = `<div
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
        >
          <img src="${recette.image}" alt="${recette.name}" loading="lazy" decoding="async" class="w-full h-44 sm:h-52 object-cover" />

          <div class="p-4 sm:p-5 space-y-3">
            <h2 class="text-lg sm:text-xl font-bold text-gray-800 break-words">${recette.name}</h2>

            <div
              class="flex items-center justify-between gap-2 text-gray-500 text-sm"
            >
              <p class="truncate">
                <i class="fa-solid fa-utensils mr-1"></i>
                ${recette.cuisine}
              </p>

              <p class="shrink-0">
                <i class="fa-regular fa-clock mr-1"></i>
             ${recette.prepTimeMinutes} min
              </p>
            </div>

            <div class="flex items-center justify-between gap-2 pt-2">
              <span
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shrink-0"
              >
               ${recette.difficulty}
              </span>

              <button data-id="${recette.id}" class="bg-red-500 p-1.5 rounded-2xl text-white hover:bg-red-700 transition shrink-0">
                <i class="fa-regular fa-trash-can mr-1"></i>
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        </div>`;

  return card;
}

export function afficherCard(tab) {
  const contener = document.querySelector("#contener_recette");
  const nombreCard = document.querySelector("#nombre_recettes");
  contener.innerHTML = "";
  tab.forEach((e) => {
    contener.append(creerCard(e));
  });
  nombreCard.textContent = `${tab.length} recettes`;
}

export function ajouterCardAuDebut(recette) {
  const contener = document.querySelector("#contener_recette");
  const nombreCard = document.querySelector("#nombre_recettes");
  contener.prepend(creerCard(recette));
  nombreCard.textContent = `${contener.children.length} recettes`;
}

export async function rechercherRecette(recherche) {
  const response = await api.get(`/recipes/search?q=${recherche}`);
  return response.data;
}

export function afficherAucuneRecette() {
  const contener = document.querySelector("#contener_recette");

  const div = document.createElement("div");
  div.className =
    "col-span-full flex min-h-[400px] w-full flex-col items-center justify-center text-center px-4 py-12";

  const icon = document.createElement("div");
  icon.className =
    "flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700 mb-6";
  icon.innerHTML = '<i class="fa-solid fa-magnifying-glass text-3xl"></i>';

  const h2 = document.createElement("h2");
  h2.className = "text-2xl font-bold text-gray-800 mb-3";
  h2.textContent = "Aucune recette trouvée";

  const p = document.createElement("p");
  p.className = "max-w-md text-gray-500 mb-7 leading-relaxed";
  p.textContent =
    "Nous n'avons trouvé aucune recette correspondant à votre recherche. Essayez avec un autre mot-clé.";

  const btn = document.createElement("button");
  btn.className =
    "rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-800 hover:shadow-lg active:scale-95";
  btn.innerHTML =
    '<i class="fa-solid fa-utensils mr-2"></i> Afficher les 12 recettes';

  btn.addEventListener("click", async () => {
    const data = await getRecette();
    afficherCard(data.recipes);
  });

  div.append(icon, h2, p, btn);

  contener.innerHTML = "";
  contener.append(div);
}

export function afficherForm() {
  const form = document.getElementById("form");
  form.classList.remove("hidden");
}

export function fermerForm() {
  const form = document.getElementById("form");
  form.classList.add("hidden");
}

export function afficherErreurs(erreurs) {
  cacherErreurs();

  if (erreurs.name) {
    const erreurNom = document.querySelector("#eror_nom");
    erreurNom.textContent = erreurs.name;
    erreurNom.classList.remove("hidden");
  }

  if (erreurs.cuisine) {
    const erreurCuisine = document.querySelector("#erorr_cuisine");
    erreurCuisine.textContent = erreurs.cuisine;
    erreurCuisine.classList.remove("hidden");
  }

  if (erreurs.difficulty) {
    const erreurDifficulte = document.querySelector("#erorr_difficulte");
    erreurDifficulte.textContent = erreurs.difficulty;
    erreurDifficulte.classList.remove("hidden");
  }

  if (erreurs.prepTimeMinutes) {
    const erreurTemps = document.querySelector("#erorr_temps");
    erreurTemps.textContent = erreurs.prepTimeMinutes;
    erreurTemps.classList.remove("hidden");
  }
}

function cacherErreurs() {
  document.querySelector("#eror_nom").classList.add("hidden");
  document.querySelector("#erorr_cuisine").classList.add("hidden");
  document.querySelector("#erorr_difficulte").classList.add("hidden");
  document.querySelector("#erorr_temps").classList.add("hidden");
}

export function afficherMessageSucces(message) {
  const messageSucces = document.querySelector("#message_succes");
  messageSucces.textContent = message;
  messageSucces.classList.remove("hidden");
}

export function afficherMessageErreur(message) {
  const messageErreur = document.querySelector("#erreur_api");
  messageErreur.textContent = message;
  messageErreur.classList.remove("hidden");
}

export function cacherMessageErreur() {
  document.querySelector("#erreur_api").classList.add("hidden");
}

export async function ajouterRecette(recette) {
  const response = await api.post("/recipes/add", recette);
  return response.data;
}

export async function supprimerRecette(id) {
  const response = await api.delete(`/recipes/${id}`);
  return response.data;
}

export function confirmRecette() {
  const contener = document.querySelector("#contener_recette");
  const nombreCard = document.querySelector("#nombre_recettes");

  contener.addEventListener("click", async (event) => {
    const bouton = event.target.closest("button[data-id]");

    if (!bouton) {
      return;
    }

    const id = bouton.dataset.id;

    if (!confirm("Voulez-vous vraiment supprimer cette recette ?")) {
      return;
    }

    try {
      await supprimerRecette(id);

      bouton.closest(".bg-white").remove();

      nombreCard.textContent = `${contener.querySelectorAll("button[data-id]").length} recettes`;

      afficherMessageSucces("La recette a été supprimée avec succès.");
    } catch (error) {
      afficherMessageErreur(
        "Impossible de supprimer cette recette. Veuillez réessayer.",
      );
    }
  });
}
