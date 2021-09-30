export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo = () => {
    return {
      name: this._name,
      job: this._job
    };
  }

  setUserInfo (name, job) {
    document.querySelector('.profile__name').textContent = name;
    document.querySelector('.profile__job').textContent = job;
  }
}
