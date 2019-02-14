import { BaseComponent } from '../../common/components/base/base.component.js';

export class PhonesCatalogComponent extends BaseComponent {
  constructor({ element, phones, onPhoneSelect }) {
    super({ element });
    this.phones = phones;
    this.onPhoneSelect = onPhoneSelect;
    this._render();
    this._element.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick({ target }) {
    const liElement = target.closest('.thumbnail');
    if (!liElement) {
      return;
    }
    if (target.tagName === 'IMG' || target.matches('.head-link')) {  //переход только по превью или ссылке
      this.onPhoneSelect(liElement.dataset.id);
    }
    
  }

  _render() {
    this._element.innerHTML = `
          <ul class="phones">
          ${this.phones.reduce((html, phone) => {
      return `${html}     <li class="thumbnail" data-id=${phone.id}>
          <a href="#!/phones/${phone.id}" class="thumb">
            <img alt=${phone.id} src=${`assets/${phone.imageUrl}`}>
          </a>
          <div class="phones__btn-buy-wrapper">
            <a class="btn btn-success">
              Add
            </a>
          </div>
          <a href="#!/phones/${phone.id}" class='head-link'>${phone.name}</a>
          <p>${phone.snippet}</p>
        </li>`
    }, '')}
   
      </ul>
    `
  }
}