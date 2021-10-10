import './index.css';
import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import {
  validationParameters,
  editButton,
  addButton,
  changeAvatarButton,
} from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-28', 'd4cb5b7f-5320-434f-86cf-ffb43333f91a');

//Объект UserInfo с селекторами элемента имени пользователя и элемента информации и себе
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  });

//Создание объекта Секции для отрисовки изначального массива карточек
const cardsList = new Section({
  items: [],
  renderer: api.getInitialCards().
    then(data => {
      data.forEach((dataItem) => {
        const card = createCard(dataItem);
        cardsList.addItemAppend(card);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  },
  '.elements__list'
);

//Создание объекта попап добавления карточки
const popupAdd = new PopupWithForm(
  '.popup_type_add',
  //Функция коллбэк сабмита формы
  (evt) => {
    evt.preventDefault();
    popupAdd.renderLoading(true);

    const inputValues = popupAdd.getInputValues();

    api.addCard(inputValues.place, inputValues.image)
      .then(data => {
        const card = createCard(data);
        cardsList.addItemPrepend(card);
        popupAdd.renderLoading(false);
        popupAdd.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

//Создание объекта попап редактирования информации о пользователе
const popupEdit = new PopupWithForm(
  '.popup_type_edit',
  //Функция коллбэк сабмита формы
  (evt) => {
    evt.preventDefault();

    popupEdit.renderLoading(true);
    const inputValues = popupEdit.getInputValues();
    api.setUserInfo(inputValues.name, inputValues.job)
      .then(data => {
        userInfo.setUserInfo(data);
        popupEdit.renderLoading(false);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const popupChangeAvatar = new PopupWithForm(
  '.popup_type_changeAvatar',
  (evt) => {
    evt.preventDefault();
    popupChangeAvatar.renderLoading(true);

    const inputValues = popupChangeAvatar.getInputValues();
    api.setAvatarInfo(inputValues.avatar)
      .then(data => {
        userInfo.setUserInfo(data);
        popupChangeAvatar.renderLoading(false);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
)

//Создание объекта попап открытия картинки из карточки
const popupImage = new PopupWithImage('.popup_type_image');

const popupDelete = new PopupWithDelete('.popup_type_delete');

//Объект для валидации формы редактирования информации о пользователе
const popupEditValidation = new FormValidation(validationParameters, document.querySelector('.popup_type_edit'));
popupEditValidation.enableValidation();

//Объект для валидации формы добавления карточки
const popupAddValidation = new FormValidation(validationParameters, document.querySelector('.popup_type_add'));
popupAddValidation.enableValidation();

const popupChangeAvatarValidation = new FormValidation (validationParameters, document.querySelector('.popup_type_changeAvatar'));
popupChangeAvatarValidation.enableValidation();

cardsList.renderItems(); //Отрисовка карточек

//Открытие попап картинки карточки
function handleImageClick(name, title) {
  popupImage.open(name, title);
};

//Создание карточки
function createCard(data) {
  const card = new Card({
    data: data,
    templateSelector: '.element-template',
    userId: userInfo.userId,
    handleImageClick,
    handleDeleteClick: (card) => {
      popupDelete.open();
      popupDelete.setSubmitAction({
        cardId: card.cardId,
        deleteCard: (cardId) => {
          api.deleteCard(cardId)
           .then(data => {
              card.handleDeleteCard();
              popupDelete.close();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
    },
    handleLikeClick: (card) => {
      api.changeLikeStatus(card.cardId, card.likeStatus)
        .then(data => {
          card._likesList = data.likes;
          card.likeStatus = card._isLiked();
          card.setLikesInfo();
          card.togleActiveLike();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const cardElement = card.createCard();
  return cardElement;
}

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();
popupDelete.setEventListeners();
popupChangeAvatar.setEventListeners();

editButton.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
  popupEditValidation.resetValidation();
});

addButton.addEventListener('click', () => {
  popupAdd.open();
  popupAddValidation.resetValidation();
});

changeAvatarButton.addEventListener('click', () => {
  popupChangeAvatar.open();
  popupChangeAvatarValidation.resetValidation();
})
