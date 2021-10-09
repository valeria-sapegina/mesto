import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');

  }

  setSubmitAction({cardId, deleteCard}) {
    this._form.addEventListener('submit',(evt) => {
      evt.preventDefault();
      deleteCard(cardId);
    });
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
