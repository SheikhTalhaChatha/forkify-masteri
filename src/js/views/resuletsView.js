import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";

import View from "./View.js";

class ResuletsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessaga=('The server is could not find your recipe plzz try again!');
    _message = '';
    

    _gernerateMatkup(){
      return this._data.map(resulet => previewView.render(resulet, false)).join('');
      
  };
    
}
export default new ResuletsView()