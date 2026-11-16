import { api } from "./api.js";
export async function getRecette () {
    const responce=await api.get("/recipes?limit=15")
    console.log(responce.data)
    return responce.data
}
export function afficherCard(tab){
    const contener=document.querySelector("#contener_recette")
    const nombreCard=document.querySelector("#nombre_recettes")
    nombreCard.textContent=`${tab.length} recettes`
    contener.innerHTML=""
tab.forEach(e => {
        const card=document.createElement("div")
        card.innerHTML=`<div
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
        >
          <img src="${e.image}" alt="${e.name}" class="w-full h-52 object-cover" />

          <div class="p-5 space-y-3">
            <h2 class="text-xl font-bold text-gray-800">${e.name}</h2>

            <div
              class="flex items-center justify-between text-gray-500 text-sm"
            >
              <p>
                <i class="fa-solid fa-utensils mr-1"></i>
                ${e.cuisine}
              </p>

              <p>
                <i class="fa-regular fa-clock mr-1"></i>
             ${e.prepTimeMinutes} min
              </p>
            </div>

            <div class="flex items-center justify-between pt-2">
              <span
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
              >
               ${e.difficulty} 
              </span>

              <button class="bg-red-500 p-1.5 rounded-2xl text-white hover:bg-red-700 transition">
                <i class="fa-regular fa-trash-can mr-1"></i>
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        </div>`

        contener.append(card)
    });
}