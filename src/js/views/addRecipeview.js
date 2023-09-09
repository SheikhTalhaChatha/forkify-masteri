import icons from "url:../../img/icons.svg"

import View from "./View.js";

class AddRecipeView extends View{
    
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded :)'
    _btnClose = document.querySelector('.btn--close-modal');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay ');
constructor(){
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideindow();
}

toggleWindow(){
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden'); 
}




    _addHandlerShowWindow(){
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
    }

    _addHandlerHideindow(){
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
        this._overlay.addEventListener('click',this.toggleWindow.bind(this))

    }
    _addHandlerUplode(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            const dataArr =[...new FormData(this)];
            const data = Object.fromEntries(dataArr)
            handler(data)
        })
    }

    _gernerateMatkup(){
       
}
}
export default new AddRecipeView();