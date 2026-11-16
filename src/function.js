import { api } from "./api.js";
export async function getRecette () {
    const responce=await api.get("/recipes?limit=12")
    console.log(responce.data)
    return responce.data
}