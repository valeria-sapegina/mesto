import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  initialItems,
  validationParameters,
  editButton,
  addButton
} from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js';

//Объект UserInfo с селекторами элемента имени пользователя и элемента информации и себе
const userInfo = new UserInfo(
  {
    name:'profile__name',
    job:'profile__job'
  }
);

//Создание объекта Секции для отрисовки изначального массива карточек
const cardsList = new Section({
  items: initialItems,
  renderer: (item) => {
    const card = createCard(item.name, item.link);
    cardsList.addItem(card);
    },
  },
  '.elements__list'
);

//Создание объекта попап добавления карточки
const popupAdd = new PopupWithForm(
  '.popup_type_add',
  //Функция коллбэк сабмита формы
  (evt) => {
    evt.preventDefault();

    const name = document.querySelector('.popup__input_content_place-name').value;
    const link = document.querySelector('.popup__input_content_image-link').value;

    const card = createCard(name, link);
    cardsList.addItem(card);

    popupAdd.close();
  }
);

//Создание объекта попап редактирования информации о пользователе
const popupEdit = new PopupWithForm(
  '.popup_type_edit',
  //Функция коллбэк сабмита формы
  (evt) => {
    evt.preventDefault();

    const inputValues = popupEdit._getInputValues();

    userInfo.setUserInfo(inputValues.name, inputValues.job);

    popupEdit.close();
  }
);

//Создание объекта попап открытия картинки из карточки
const popupImage = new PopupWithImage('.popup_type_image');

//Объект для валидации формы редактирования информации о пользователе
const popupEditValidation = new FormValidation(validationParameters, document.querySelector('.popup_type_edit'));
popupEditValidation.enableValidation();

//Объект для валидации формы добавления карточки
const popupAddValidation = new FormValidation(validationParameters, document.querySelector('.popup_type_add'));
popupAddValidation.enableValidation();

cardsList.renderItems(); //Отрисовка карточек

//Открытие попап картинки карточки
function handleImageClick(name, title) {
  popupImage.open(name, title);
};

//Создание карточки
function createCard(name, link) {
  const card = new Card(name, link, '.element-template', handleImageClick);
  const cardElement = card.createCard();
  return cardElement;
}

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

editButton.addEventListener('click', () => {
  popupEdit.open();
  popupEditValidation.resetValidation();
});

addButton.addEventListener('click', () => {
  popupAdd.open();
  popupAddValidation.resetValidation();
});
