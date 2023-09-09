import icons from "url:../../img/icons.svg"

export default class View{
   _data;

    render(data, render = true){
      if(!data || (Array.isArray(data) && data.length === 0 )) 
      return this.renderError();
      this._data = data;
      const markup = this._gernerateMatkup();
      if(!render) return markup;
      this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    update(data){
      this._data = data;
      const newMarkup = this._gernerateMatkup();
      const newDom = document.createRange().createContextualFragment(newMarkup);
      const newElement =Array.from(newDom.querySelectorAll('*'));
      const curElement =Array.from(this._parentElement.querySelectorAll('*'))


newElement.forEach((newEl, i)=>{
  const curEl = curElement[i];

  if(!newEl.isEqualNode(curEl) &&
   newEl.firstChild?.nodeValue.trim() !== ''){
    curEl.textContent = newEl.textContent;
  }
//attributes of servings

if(!newEl.isEqualNode(curEl))
Array.from(newEl.attributes).forEach(attr =>
  curEl.setAttribute(attr.name, attr.value)
  
  )
})

}
    
    
     renderSpinner = function(){
      const markup = `
      <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
      `;
      this._clear()
      this._parentElement.insertAdjacentHTML('afterbegin', markup)
    };
    
    _clear(){
        console.log(this._parentElement)
      this._parentElement.innerHTML= '';
    }
    renderError(message = this._errorMessaga){
      const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
    
    };
    renderMessage(message = this._message){
      const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
    
    }
}