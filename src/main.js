import { afficherCard, getRecette,rechercherRecette } from './function.js'
import './style.css'
 let data= await getRecette()
 afficherCard(data.recipes)

const input = document.querySelector("#recherche");
input.addEventListener("input", async () => {
    const query = input.value.trim();
    if (query === "") {
        const data = await getRecette();
        afficherCard(data.recipes);
        return;
    }
    const data = await rechercherRecette(query);
    afficherCard(data.recipes);
});