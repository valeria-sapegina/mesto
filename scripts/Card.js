import { openPopup } from "./index.js";

export default class Card {

  constructor(title, img, templateSelector) {
    this._img = img;
    this._title = title;
    this._templateSelector = templateSelector;
  }

  _getTemplate = () => {
    const _template = document.querySelector(this._templateSelector);
    return _template.content.firstElementChild.cloneNode(true);
  }

  _addCard = () => {
    this._element.querySelector('.element__img').src = this._img;
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__img').alt = this._title;
  }

  _setEventListeners = () => {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  _handleLikeClick = () => {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteClick = () => {
    this._element.remove();
  }

  _handleImageClick = () => {
    const imagePopup = document.querySelector('.popup__image-container');
    imagePopup.querySelector('.popup__image').src = this._img;
    imagePopup.querySelector('.popup__image').alt = this._title;
    imagePopup.querySelector('.popup__caption').textContent = this._title;
    openPopup(imagePopup);
  }

  render = (container) => {
    this._element = this._getTemplate();
    this._addCard();
    this._setEventListeners();

    container.prepend(this._element);
  }
}
