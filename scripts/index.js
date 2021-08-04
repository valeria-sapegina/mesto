const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const editButton = document.querySelector('.button_type_edit');
const closeButtons = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.button_type_add');

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
  listenerDeleteButtons();
  listenerLikeButtons();
  listenerElementImages();
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
}

function listenerDeleteButtons() {
  let deleteButtons = elementList.querySelectorAll('.element__delete');
  deleteButtons.forEach(function(item) {
    item.addEventListener('click', deleteItem);
  });
}

function listenerLikeButtons() {
  let likeButtons = elementList.querySelectorAll('.element__like');
  likeButtons.forEach(function(item) {
    item.addEventListener('click', like);
  });
}

function listenerElementImages() {
  let elementImages = elementList.querySelectorAll('.element__img');
  elementImages.forEach(function(item) {
    item.addEventListener('click', openImage);
  });
}

function deleteItem(evt) {
  evt.target.closest('.element').remove();
}

function like(evt) {
  evt.target.classList.toggle('element__like_active');
}

function openImage(evt) {
  let parent = evt.target.parentElement;
  document.querySelector('.popup__image-container').closest('.popup').classList.toggle('popup_opened');
  document.querySelector('.popup__image').src = evt.target.src;
  document.querySelector('.popup__caption').textContent = parent.querySelector('.element__title').textContent;
}

initialItem.forEach(addItem);

editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeButtons.forEach(function(item) {
  item.addEventListener('click', closePopup);
});
editForm.addEventListener('submit', formEditSubmitHandler);
addForm.addEventListener('submit', formAddSubmitHandler);

