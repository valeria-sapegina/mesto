import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');

  }

  setSubmitAction({cardId, deleteCard}) {
    this._cardId = cardId;
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._form.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._deleteCard(this._cardId);
    });
  }
}
