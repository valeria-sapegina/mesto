export default class Card {

  constructor({data, templateSelector, userId, handleImageClick, handleDeleteClick}) {
    this._img = data.link;
    this._title = data.name;
    this._likeCount = data.likes.length;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this.cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likesList = data.likes;
    this.likeStatus = false;
    }

  _getTemplate (){
    const template = document.querySelector(this._templateSelector);
    return template.content.firstElementChild.cloneNode(true);
  }

  _addCard () {
    this._element.querySelector('.element__img').src = this._img;
    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__img').alt = this._title;
  }

  _setEventListeners() {
    this._likeElement = this._element.querySelector('.element__like');
    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleImageClick(this._img, this._title);
    });
  }

  _handleLikeClick() {
    this._likeElement.classList.toggle('element__like_active');
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  createCard() {
    this._element = this._getTemplate();
    this._addCard();
    this._setEventListeners();
    this._setLikesInfo();
    this._removeDeleteFromNonOwner();

    this.likeStatus = this._isLiked();
    if (this.likeStatus) {
      this._likeElement.classList.add('element__like_active');
    }


    return this._element;
  }

  _removeDeleteFromNonOwner() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__delete').classList.add('element__delete_inactive');
    }
  }

  _isLiked() {
    let flag = false;
    if(this._likesList != undefined) {
      this._likesList.forEach((like) => {
        if (like._id === this._userId) {
          flag = true;
        }
      })
    }

    return flag;
  }

  _setLikesInfo() {
    this._likeCountElement = this._element.querySelector('.element__count-like');
    this._likeCountElement.textContent = this._likeCount;
  }
}
