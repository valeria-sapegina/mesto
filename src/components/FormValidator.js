export default class FormValidation {
  constructor (validationParameters, formElement) {
    this._formSelector = validationParameters.formSelector;
    this._inputSelector = validationParameters.inputSelector;
    this._submitButtonSelector = validationParameters.submitButtonSelector;
    this._inactiveButtonClass = validationParameters.inactiveButtonClass;
    this._inputErrorClass = validationParameters.inputErrorClass;
    this._errorClass = validationParameters.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._makeSubmitButtonInactive();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _resetErrorMessage() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  _makeSubmitButtonInactive() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._makeSubmitButtonInactive();
    this._resetErrorMessage();
  }
}
