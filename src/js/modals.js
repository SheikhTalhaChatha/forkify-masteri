import { async } from "regenerator-runtime";

import { API_URL ,RES_PER_PAGE, KEY} from "./config.js";
// import {getJSON, sendJSON} from "./helpers.js"
import {AJAX} from "./helpers.js"


export const state = {
    recipe:{},
    search :{
     query:'',
     resulets:[],
     page: 1 ,
     resuletsPerPage:RES_PER_PAGE,

    },
    bookmarks:[],
};

const creatRecipeObject = function(data){
  const {recipe} = data.data;

  return  {
  
  cookingTime: recipe.cooking_time,
  image: recipe.image_url,
  sourceUrl: recipe.source_url,
  id: recipe.id,
  ingredients: recipe.ingredients,
  publisher: recipe.publisher,
  servings: recipe.servings,
  title: recipe.title,
...(recipe.key && {key : recipe.key}),
  };
}

export const loadRecipe = async function(id){
    try{
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`)
        // const data = await AJAX(`${API_URL}${id}`)
      state.recipe = creatRecipeObject(data)

      if(state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true
    else state.recipe.bookmarked = false
    console.log(state.recipe)
    }catch(err){
        
        console.error (`${err} 🔥🔥🔥🔥🔥`)
        throw err;
    }  

}

export const loadSearchResulets = async function(query){
    try {
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        state.search.resulets = data.data.recipes.map(rec => {
          return {
            id: rec.id,
            image: rec.image_url,
            publisher: rec.publisher,
            title: rec.title,
            ...(rec.key && {key : rec.key}),
          };
        });
        state.search.query = query;
        state.search.page = 1;
      } catch (error) {
        console.error (`${err} 🔥🔥🔥🔥🔥`)
        throw error;
      }
    };


export const getSearchResuletsPage = function(page = state.search.page){
    state.search.page = page;
    const start = (page -1) *state.search.resuletsPerPage //0;
    const end =  page * state.search.resuletsPerPage//9; 
    return state.search.resulets.slice(start, end)
};

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });
    state.recipe.servings = newServings;
};

const persistBOokmark = function(){
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks) )
}

export const addBookMark = function(recipe){
state.bookmarks.push(recipe)
//mark condetion
if(recipe.id===state.recipe.id) state.recipe.bookmarked = true;
 persistBOokmark()

};

// remove the bookmark on the recipe
export const deleteBookmark = function(id){
    const index = state.bookmarks.findIndex(el =>el.id === id )
    state.bookmarks.splice(index, 1)

    if(id===state.recipe.id) state.recipe.bookmarked = false;
 persistBOokmark()
}

const init  = function(){
const storage = localStorage.getItem('bookmarks' );
if(storage) state.bookmarks = JSON.parse(storage)
}
init();

const clearBookmark = function(){
  localStorage.clear('bookmarks')
};
clearBookmark();

export const uploadRecipe = async function(newRecipe){
  try{
  const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient')&&
  entry[1]!== '').map(ing => {
    const ingArr = ing[1].split(',').map(el => el.trim())
    // const ingArr = ing[1]
    // .replaceAll(' ', '').split(',')
    if(ingArr.length !== 3) throw new 
    Error('Wrong ingredient format! plzz use the corect format:)')
  const [quantity, unit, description] = ingArr ;
  return {quantity: quantity ? + quantity:null, unit, description}
  });
  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients,
  }
 const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
state.recipe = creatRecipeObject(data)
addBookMark(state.recipe)
}catch(err){
  throw err;
}

}



