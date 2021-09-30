import { profileJob, profileName } from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._inputName = this._popup.querySelector('.popup__input_content_name');
    this._inputJob = this._popup.querySelector('.popup__input_content_job');
  }

  _getInputValues() {
    return {
      name: this._inputName.value,
      job: this._inputJob.value
    };
  }

  open () {
    super.open();

    if (this._popup.classList.contains('popup_type_edit')) {
      this._inputName.value = profileName.textContent;
      this._inputJob.value = profileJob.textContent;
    }
  }

  close() {
    super.close();

    this._popup.querySelector('.popup__form').reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.querySelector('.popup__form').addEventListener('submit', this._formSubmitHandler);
  }
}
