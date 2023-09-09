import icons from "url:../../img/icons.svg"
import previewView from "./previewView.js";

import View from "./View.js";

class BookmarkView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessaga=('No bookmarks yet. Find a Nice recipe and bookmark it!');
    _message = '';
 addHandler(handler){
    window.addEventListener('load', handler)
 }

    _gernerateMatkup(){
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
        
    };
   
    
}
export default new BookmarkView()

//
