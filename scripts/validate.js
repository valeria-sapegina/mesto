const validationParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

function showInputError(formElement, inputElement, errorMessage, validationParameters) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationParameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParameters.errorClass);
};

function hideInputError(formElement, inputElement, validationParameters) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationParameters.inputErrorClass);
  errorElement.classList.remove(validationParameters.errorClass);
  errorElement.textContent = '';
};

//Функция проверки валидности input
function checkInputValidity(formElement, inputElement, validationParameters) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationParameters);
  } else {
    hideInputError(formElement, inputElement, validationParameters);
  };
};

//Фунция сброса сообщение об ошибки валидации input
function resetErrorMessage (formElement, validationParameters) {
  const inputList = Array.from(formElement.querySelectorAll(validationParameters.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationParameters);
  });
};

//Навешивание слушателей на все input
function setEventListeners(formElement, validationParameters) {
  const inputList = Array.from(formElement.querySelectorAll(validationParameters.inputSelector));

  const buttonElement = formElement.querySelector(validationParameters.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationParameters);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationParameters);
      toggleButtonState(inputList, buttonElement, validationParameters);
    });
  });
};

//Проверка на наличие невалидных input
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Функция переключения состояний кнопки
function toggleButtonState(inputList, buttonElement, validationParameters) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationParameters.inactiveButtonClass);
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(validationParameters.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function validationCheckOnOpenPopup(formElement, validationParameters) {
  const buttonElement = formElement.querySelector(validationParameters.submitButtonSelector);

  buttonElement.classList.add(validationParameters.inactiveButtonClass);
  buttonElement.disabled = true
};

function enableValidation(validationParameters) {
  const formList = Array.from(document.querySelectorAll(validationParameters.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, validationParameters);
  });
};

enableValidation(validationParameters);
