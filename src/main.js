import { afficherCard, getRecette } from './function.js'
import './style.css'
 let data= await getRecette()
 afficherCard(data.recipes)
