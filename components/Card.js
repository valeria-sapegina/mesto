export default class Card {

  constructor(title, img, templateSelector, handleImageClick) {
    this._img = img;
    this._title = title;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate (){
    const template = document.querySelector(this._templateSelector);
    return template.content.firstElementChild.cloneNode(true);
  }

  _addCard () {
    this._element.querySelector('.element__img').src = this._img;
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__img').alt = this._title;
  }

  _setEventListeners() {
    this._likeElement = this._element.querySelector('.element__like');
    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleImageClick(this._img, this._title);
    });
  }

  _handleLikeClick() {
    this._likeElement.classList.toggle('element__like_active');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  createCard() {
    this._element = this._getTemplate();
    this._addCard();
    this._setEventListeners();

    return this._element;
  }
}
