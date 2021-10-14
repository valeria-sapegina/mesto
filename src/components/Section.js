export default class Section {
  constructor({ items, renderer }, containerSelector){
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems = (data) => {
    this._items = data;
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItemAppend = (element) => {
    this._container.append(element);
  }

  addItemPrepend = (element) => {
    this._container.prepend(element);
  }
}
