import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  open(image, title) {
    this._popup.querySelector('.popup__image').src = image;
    this._popup.querySelector('.popup__image').alt = title;
    this._popup.querySelector('.popup__caption').textContent = title;

    super.open();
  }
}
