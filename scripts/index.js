const popup = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelectorAll('.popup__close');
const addButton = document.querySelector('.button_type_add');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_content_name');
const inputJob = document.querySelector('.popup__input_content_job');

const form = document.querySelector('.popup__form');

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
function closePopup(event) {
  this.parentElement.parentElement.classList.toggle('popup_opened');
}

//Функция отправки формы
function formSubmitHandler (evt) {
  evt.preventDefault();

  //Получения введенных значений в поля name и job
  let name = inputName.value;
  let job = inputJob.value;

  //Сохранение полученных значений name и job в соответствующие поля html
  profileName.textContent = name;
  profileJob.textContent = job;

  form.parentElement.parentElement.classList.toggle('popup_opened');
}

editButton.addEventListener('click', openPopupEdit);
closeButton.forEach(function(item) {
  item.addEventListener('click', closePopup);
});
form.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openPopupAdd);
