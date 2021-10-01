export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameInput = document.querySelector(nameSelector);
    this._jobInput = document.querySelector(jobSelector);
  }

  getUserInfo = () => {
    return {
      name: this._nameInput.textContent,
      job: this._jobInput.textContent
    };
  }

  setUserInfo ({name, job}) {
    this._nameInput.textContent = name;
    this._jobInput.textContent = job;
  }
}
