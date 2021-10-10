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

  renderLoading(isLoading) {
    this._submitBtn = this._popup.querySelector('.popup__submit-btn');
    if (isLoading) {
      this._textBefore = this._submitBtn.textContent;
      if (this._submitBtn.textContent === 'Сохранить') {
        this._submitBtn.textContent = 'Сохранение...'
      } else if (this._submitBtn.textContent === 'Создать') {
        this._submitBtn.textContent = 'Создание...'
      } 
    } else {
      this._submitBtn.textContent =  this._textBefore;
    }
  }
}
