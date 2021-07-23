const popup = document.querySelector('.popup');
const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_content_name');
const inputJob = document.querySelector('.popup__input_content_job');

const form = document.querySelector('.popup__form');

// Функция открытия попап
function openPopup(event) {
  popup.classList.toggle('popup_opened');

  //Добавление текущих значений name и job в поля input
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

//Функция закрытия попап
function closePopup(event) {
  popup.classList.toggle('popup_opened');
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

  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', formSubmitHandler);
