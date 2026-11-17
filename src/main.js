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
    cacherMessageErreur
} from './function.js'
import { validerRecette } from './validation.js'
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

const ajouterbtn=document.getElementById("ajouter")
ajouterbtn.addEventListener("click",afficherForm)

const Xform=document.getElementById("fermer_form")
const btnFermer=document.getElementById("annuler_form")
Xform.addEventListener("click",fermerForm)
btnFermer.addEventListener("click",fermerForm)

const formRecette=document.querySelector("#form_recette")
const btnAjouter=document.querySelector("#btn_ajouter_recette")

formRecette.addEventListener("submit", async (event) => {
    event.preventDefault();
    cacherMessageErreur();

    const recette = {
        name: document.querySelector("#nom").value.trim(),
        cuisine: document.querySelector("#cuisine").value.trim(),
        difficulty: document.querySelector("#difficulte").value,
        prepTimeMinutes: Number(document.querySelector("#temps").value)
    };

    const erreurs = validerRecette(recette);
    afficherErreurs(erreurs);

    if (erreurs.name || erreurs.cuisine || erreurs.difficulty || erreurs.prepTimeMinutes) {
        return;
    }

    btnAjouter.disabled = true;

    try {
        const nouvelleRecette = await ajouterRecette(recette);

        if (!nouvelleRecette.image) {
            nouvelleRecette.image = "hero.jpg";
        }

        ajouterCardAuDebut(nouvelleRecette);
        afficherMessageSucces("La recette a été ajoutée avec succès.");
        formRecette.reset();
        fermerForm();
    } catch (error) {
        afficherMessageErreur("Impossible d'ajouter la recette. Veuillez réessayer.");
    } finally {
        btnAjouter.disabled = false;
    }
});