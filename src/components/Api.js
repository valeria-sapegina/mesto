export default class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(e => console.log(e))
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(e => console.log(e))
  }

  setUserInfo(name, job) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(e => console.log(e))
  }

  setAvatarInfo(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(e => console.log(e))
  }

  addCard(place, image) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: place,
        link: image
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(e => console.log(e))
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(e => console.log(e))
  }

  changeLikeStatus (cardId, likeStatus) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: likeStatus ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(e => console.log(e))
  }
}

