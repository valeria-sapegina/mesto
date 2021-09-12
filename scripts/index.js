import Card from './Card.js';
import FormValidation from './FormValidator.js';

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_content_name');
const inputJob = document.querySelector('.popup__input_content_job');

const initialItems = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationParameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const popupEditValidation = new FormValidation(validationParameters, popupEdit);
popupEditValidation.enableValidation();

const popupAddValidation = new FormValidation(validationParameters, popupAdd);
popupAddValidation.enableValidation();

const container = document.querySelector('.elements__list');

initialItems.forEach((item) => {
  renderCard(item.name, item.link, '.element-template');
});

function renderCard (name, link, templateSelector) {
  const card = new Card(name, link, templateSelector);
  container.prepend(card.createCard());
}

function openPopupEdit(popup) {
  openPopup(popup);
  popupEditValidation.resetValidation();

  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();

  //Получения введенных значений в поля name и job
  const name = inputName.value;
  const job = inputJob.value;

  //Сохранение полученных значений name и job в соответствующие поля html
  profileName.textContent = name;
  profileJob.textContent = job;

  closePopup(popupEdit);
}

function openPopupAdd (popup) {
  openPopup(popup);
  popupAddValidation.resetValidation();
}

function formAddSubmitHandler(evt) {
  evt.preventDefault();

  const name = document.querySelector('.popup__input_content_place-name').value;
  const link = document.querySelector('.popup__input_content_image-link').value;

  renderCard(name, link, '.element-template');

  closePopup(popupAdd);
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeyEscape);
  setEventListenersOnPopup(popup);
}

function clearPopup(popup) {
  const form = popup.querySelector('.popup__form');
  form.reset();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyEscape);
}

function closePopupKeyEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

function setEventListenersOnPopup(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(evt.target.closest('.popup'));
    } else if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    };
  });
}

editButton.addEventListener('click', () => {
  openPopupEdit(popupEdit);
});

addButton.addEventListener('click', () => {
  openPopupAdd(popupAdd);
  clearPopup(popupAdd);
});

popupEdit.querySelector('.popup__form').addEventListener('submit', formEditSubmitHandler);
popupAdd.querySelector('.popup__form').addEventListener('submit', formAddSubmitHandler);


