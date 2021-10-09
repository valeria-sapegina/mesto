export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameInput = document.querySelector(nameSelector);
    this._jobInput = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo = () => {
    return {
      name: this._nameInput.textContent,
      job: this._jobInput.textContent
    };
  }

  setUserInfo (data) {
    this._nameInput.textContent = data.name;
    this._jobInput.textContent = data.about;
    this._avatarElement.src = data.avatar;
    this.userId = data._id;
  }
}
