
  
  
  import * as modal from './modals.js'
 
  import recipeView from './views/recipeView.js';
  import{ MODAL_CLOSE_SEC} from './config.js'
  import searchView from './views/searchView.js';
  import resuletsView from './views/resuletsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeview from './views/addRecipeview.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';



import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime';




// if(module.hot){
//   module.hot.accept()
// }




// 


//sppinner of the application








const controlRecipes= async function(){


    try{
      
  const id = window.location.hash.slice(1);

  if(!id) return;
  
  recipeView.renderSpinner();
// update the resulets for mark then view in recipe container
resuletsView.update(modal.getSearchResuletsPage());
//update bookMark

bookmarkView.update(modal.state.bookmarks)

    await modal.loadRecipe(id);
 //recipeView.render(modal.state.recipe)
 

 recipeView.render(modal.state.recipe)
//update bookMark

bookmarkView.update(modal.state.bookmarks)

// 

    }catch(err){
   recipeView.renderError()
  //  console.error(err)
   throw err;
    }
};
//search resulets engin
const controlSearchResulets= async function(){
try{
resuletsView.renderSpinner()

const query = searchView.getQuery();


if(!query) return;
 

await modal.loadSearchResulets(query);



// resuletsView.render(modal.state.search.resulets)
resuletsView.render(modal.getSearchResuletsPage());

//install pagination view
paginationView.render(modal.state.search);




}catch(err){

};



};

const controlPagination = function(goTOPage){
  resuletsView.render(modal.getSearchResuletsPage(goTOPage));

//install pagination view
paginationView.render(modal.state.search);
  

};

const controlServings = function(newServings){
  modal.updateServings(newServings)
  recipeView.update(modal.state.recipe)

};

//bookMark controler
const controlerAddBookmark = function(){
//add bookmark and finish the bookmark
  if(!modal.state.recipe.bookmarked) modal.addBookMark(modal.state.recipe);
  else modal.deleteBookmark(modal.state.recipe);

  recipeView.update(modal.state.recipe)
  //view the book mark items
  bookmarkView.render(modal.state.bookmarks)
};

const controlBookmark = function(){
  bookmarkView.render(modal.state.bookmarks)
}

const controleAddRecipe = async function(newRecipe){
  try{
    addRecipeview.renderSpinner();
 await modal.uploadRecipe(newRecipe)
 //uploaded the recipe and view in container
 recipeView.render(modal.state.recipe)
 //aply spiner method in uploadde recipe 
 addRecipeview.renderMessage()
//aply the bookmark view
 bookmarkView.render(modal.state.bookmarks);
 //change the id from url on the recipe
 window.history.pushState(null, '', `#${modal.state.recipe.id}`)

 setTimeout(function(){
  addRecipeview.toggleWindow()
 }, MODAL_CLOSE_SEC * 1000)
}catch(err){
  console.error(err);
  addRecipeview.renderError(err.message)
}
}  

const init = function(){
  bookmarkView.addHandler(controlBookmark);
recipeView.addHandlerRender(controlRecipes)
recipeView.addHandlerUpdateServigs(controlServings)
recipeView.addHandlerAddBookmark(controlerAddBookmark) 
searchView.addHandlerSearch(controlSearchResulets)
paginationView.addHandlerClick(controlPagination)
addRecipeview._addHandlerUplode(controleAddRecipe)


};
init()







