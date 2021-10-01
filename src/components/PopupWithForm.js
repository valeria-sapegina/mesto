import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  setInputValues(inputValues) {
    this._inputList.forEach((input) => {
      if (input.name in inputValues) {
        input.value = inputValues[input.name];
      }
    })
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  close() {
    super.close();

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

   this._form.addEventListener('submit', this._formSubmitHandler);
  }
}
