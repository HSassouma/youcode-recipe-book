import { api } from "./api.js";
export async function getRecette () {
    const responce=await api.get("/recipes?limit=15")
    console.log(responce.data)
    return responce.data
}

function creerCard(recette){
    const card=document.createElement("div")
    card.innerHTML=`<div
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
        >
          <img src="${recette.image}" alt="${recette.name}" class="w-full h-52 object-cover" />

          <div class="p-5 space-y-3">
            <h2 class="text-xl font-bold text-gray-800">${recette.name}</h2>

            <div
              class="flex items-center justify-between text-gray-500 text-sm"
            >
              <p>
                <i class="fa-solid fa-utensils mr-1"></i>
                ${recette.cuisine}
              </p>

              <p>
                <i class="fa-regular fa-clock mr-1"></i>
             ${recette.prepTimeMinutes} min
              </p>
            </div>

            <div class="flex items-center justify-between pt-2">
              <span
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
              >
               ${recette.difficulty}
              </span>

              <button class="bg-red-500 p-1.5 rounded-2xl text-white hover:bg-red-700 transition">
                <i class="fa-regular fa-trash-can mr-1"></i>
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        </div>`

    return card
}

export function afficherCard(tab){
    const contener=document.querySelector("#contener_recette")
    const nombreCard=document.querySelector("#nombre_recettes")
    contener.innerHTML=""
tab.forEach(e => {
        contener.append(creerCard(e))
    });
    nombreCard.textContent=`${tab.length} recettes`
}

export function ajouterCardAuDebut(recette){
    const contener=document.querySelector("#contener_recette")
    const nombreCard=document.querySelector("#nombre_recettes")
    contener.prepend(creerCard(recette))
    nombreCard.textContent=`${contener.children.length} recettes`
}

export async function rechercherRecette(query) {
    const response = await api.get(`/recipes/search?q=${query}`);
    return response.data;
}

export function afficherForm(){
  const form =document.getElementById("form")
  form.classList.remove("hidden")
}

export function fermerForm(){
   const form =document.getElementById("form")
  form.classList.add("hidden")
}

export function afficherErreurs(erreurs){
  cacherErreurs()

  if (erreurs.name) {
    const erreurNom=document.querySelector("#eror_nom")
    erreurNom.textContent=erreurs.name
    erreurNom.classList.remove("hidden")
  }

  if (erreurs.cuisine) {
    const erreurCuisine=document.querySelector("#erorr_cuisine")
    erreurCuisine.textContent=erreurs.cuisine
    erreurCuisine.classList.remove("hidden")
  }

  if (erreurs.difficulty) {
    const erreurDifficulte=document.querySelector("#erorr_difficulte")
    erreurDifficulte.textContent=erreurs.difficulty
    erreurDifficulte.classList.remove("hidden")
  }

  if (erreurs.prepTimeMinutes) {
    const erreurTemps=document.querySelector("#erorr_temps")
    erreurTemps.textContent=erreurs.prepTimeMinutes
    erreurTemps.classList.remove("hidden")
  }
}

function cacherErreurs(){
  document.querySelector("#eror_nom").classList.add("hidden")
  document.querySelector("#erorr_cuisine").classList.add("hidden")
  document.querySelector("#erorr_difficulte").classList.add("hidden")
  document.querySelector("#erorr_temps").classList.add("hidden")
}

export function afficherMessageSucces(message){
  const messageSucces=document.querySelector("#message_succes")
  messageSucces.textContent=message
  messageSucces.classList.remove("hidden")
}

export function afficherMessageErreur(message){
  const messageErreur=document.querySelector("#erreur_api")
  messageErreur.textContent=message
  messageErreur.classList.remove("hidden")
}

export function cacherMessageErreur(){
  document.querySelector("#erreur_api").classList.add("hidden")
}

export async function ajouterRecette(recette){
  const response=await api.post("/recipes/add",recette)
  return response.data
}
