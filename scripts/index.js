const popup = document.querySelector(".popup");
const editButton = document.querySelector(".edit-button");
const closeButton = document.querySelector(".popup__close");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const inputName = document.querySelector(".popup__input_content_name");
const inputJob = document.querySelector(".popup__input_content_job");


function togglePopup(event) {
  event.stopPropagation;
  popup.classList.toggle("popup_opened");
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);

inputName.value = profileName.textContent;
inputJob.value = profileJob.textContent;

const form = document.querySelector(".popup__container");

function formSubmitHandler (evt) {
    evt.preventDefault();

    let name = inputName.value;
    let job = inputJob.value;

    profileName.textContent = name;
    profileJob.textContent = job;

    togglePopup(event);
}

form.addEventListener('submit', formSubmitHandler);
