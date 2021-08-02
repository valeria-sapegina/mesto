const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const editButton = document.querySelector('.button__edit');
const closeButton = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.button__add');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_content_name');
const inputJob = document.querySelector('.popup__input_content_job');

const editForm = document.querySelector('[name=Edit_profile]');
const addForm = document.querySelector('[name=Add_card]');

const elementItemTemplate = document.getElementById('element-template');
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


// Функция открытия попап редактирования профиля
function openPopupEdit(event) {
  popupEdit.classList.toggle('popup_opened');

  //Добавление текущих значений name и job в поля input
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

// Функция открытия попап добавления места
function openPopupAdd(event) {
  popupAdd.classList.toggle('popup_opened');
}

//Функция закрытия попап
function closePopup(evt) {
  evt.target.closest('.popup').classList.toggle('popup_opened');
}

//Функция отправки формы редактирования профиля
function formEditSubmitHandler (evt) {
  evt.preventDefault();

  //Получения введенных значений в поля name и job
  let name = inputName.value;
  let job = inputJob.value;

  //Сохранение полученных значений name и job в соответствующие поля html
  profileName.textContent = name;
  profileJob.textContent = job;

  closePopup(evt);
}

//Добавление карточки места
function addItem(item) {
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

  const item = [
    {
      name: '',
      link: ''
    }
  ]

  item.name = name;
  item.link = link;

  addItem(item);
  closePopup(evt);
  deleteButtonListener();
  likeButtonListener();
}

function deleteItem(item) {
  item.target.closest('.element').remove();
}

function like(evt) {
  evt.target.classList.toggle('button__like_active');
}

function deleteButtonListener() {
  deleteButton = elementList.querySelectorAll('.button__delete');
  deleteButton.forEach(function(item) {
    item.addEventListener('click', deleteItem);
  });
}

function likeButtonListener() {
  likeButton = elementList.querySelectorAll('.button__like');
  likeButton.forEach(function(item) {
    item.addEventListener('click', like);
  });
}

initialItem.forEach(addItem);
let deleteButton = elementList.querySelectorAll('.button__delete');
let likeButton = elementList.querySelectorAll('.button__like');
deleteButtonListener();
likeButtonListener();

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeButton.forEach(function(item) {
  item.addEventListener('click', closePopup);
});
editForm.addEventListener('submit', formEditSubmitHandler);
addForm.addEventListener('submit', formAddSubmitHandler);

