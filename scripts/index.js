const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const editButton = document.querySelector('.button_type_edit');
const addButton = document.querySelector('.button_type_add');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_content_name');
const inputJob = document.querySelector('.popup__input_content_job');

const editForm = document.forms.name=Edit_profile;
const addForm = document.forms.name=Add_card;

const elementList = document.querySelector('.elements__list');
const initialItem = [
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

// Функция открытия и добавления значений в value попап редактирования профиля
function openPopupEdit(popup) {
  openPopup(popup);

  //Добавление текущих значений name и job в поля input
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

// Функция открытия попап
function openPopup(popup) {
  popup.closest('.popup').classList.toggle('popup_opened');
}

//Функция закрытия попап
function closePopup(evt) {
  evt.target.closest('.popup').classList.toggle('popup_opened');
}

//Функция отправки формы редактирования профиля
function formEditSubmitHandler (evt) {
  evt.preventDefault();

  //Получения введенных значений в поля name и job
  const name = inputName.value;
  const job = inputJob.value;

  //Сохранение полученных значений name и job в соответствующие поля html
  profileName.textContent = name;
  profileJob.textContent = job;

  closePopup(evt);
}

//Добавление карточки места
function addItem(item) {
  const elementItemTemplate = document.getElementById('element-template');
  const newItem = elementItemTemplate.content.firstElementChild.cloneNode(true);
  newItem.querySelector('.element__title').innerText = item.name;
  newItem.querySelector('.element__img').src = item.link;
  elementList.prepend(newItem);
}

//Функция отправки формы добавления карточки
function formAddSubmitHandler (evt) {
  evt.preventDefault();

  //Получения введенных значений в поля
  let name = document.querySelector('.popup__input_content_place-name').value;
  let link = document.querySelector('.popup__input_content_image-link').value;

  const item = {
    name: '',
    link: ''
  }

  item.name = name;
  item.link = link;

  addItem(item);
  closePopup(evt);
}

//Функция удаления карточки
function deleteItem(evt) {
  evt.target.closest('.element').remove();
}

//Функция работы кнопки лайк
function like(evt) {
  evt.target.classList.toggle('element__like_active');
}

//Функция открытия изображения карточки в отдельном окне
function openImage(evt) {
  let parent = evt.target.parentElement;
  const popupImageContainer = document.querySelector('.popup__image-container');
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImageContainer.closest('.popup').classList.toggle('popup_opened');
  popupImage.src = evt.target.src;
  popupCaption.textContent = parent.querySelector('.element__title').textContent;
}

initialItem.forEach(addItem);

editButton.addEventListener('click', () => {
  openPopupEdit(popupEdit);
});

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

editForm.addEventListener('submit', formEditSubmitHandler);
addForm.addEventListener('submit', formAddSubmitHandler);

elementList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__delete')) {
    deleteItem(evt);
  }

  if (evt.target.classList.contains('element__like')) {
    like(evt);
  }

  if (evt.target.classList.contains('element__img')) {
    openImage(evt);
  }
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt);
  }
});
