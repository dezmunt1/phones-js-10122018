import { PhonesCatalogComponent } from './phone-catalog/phone-catalog.component.js';
import { OnePhoneViewComponent } from './one-phone-view/one-phone-view.component.js';
import { PhonesPageService } from './phones-page.service.js';

export class PhonesPageComponent {
  constructor({ element }) {
    this.element = element;
    this._render();
    this._basket = {};
    this._basketNum = 0;

    this._phoneService = new PhonesPageService();

    this._phoneCatalog = new PhonesCatalogComponent({
      element: this.element.querySelector('#catalog'),
      phones: this._phoneService.getAllPhones(),
      onPhoneSelect: (phoneId)=>{
        const phoneDetails = this._phoneService.getPhonesById(phoneId);
        this._phoneCatalog.hide();
        this._phoneViewer.show(phoneDetails);
      }
    });

    this._phoneViewer = new OnePhoneViewComponent({
      element: this.element.querySelector('#item'),
    });

    this.element.addEventListener('click', ({target})=>{   // Обработчик кнопки назад через делигирование
      if (target.matches('.phone__back-button')) {  // обработчик кнопки назад
        this._phoneCatalog.show();
        this._phoneViewer.hide();
      }
      
      if (target.closest('.phone-thumbs')) { // обработчик картинок
        if (target.tagName !== 'IMG') return;
        let srcTarget = target.getAttribute('src');
        document.querySelector('.phone').setAttribute('src', srcTarget);
      }

      if (target.matches('.btn-success') || target.matches('.phone__basket-button')) { // обработчик корзины
        target = this._phoneCatalog._element.querySelector('li.thumbnail');
        let key = {
          id: target.dataset.id,
          href: `<a href="${target.querySelector('a.head-link')}"> ${target.dataset.id} </a>`
        }
        this._addBasket(key);
      }
    });
  }

  _addBasket(options) {    //Добавляем в DOM <li> с товарами
    let ul = this.element.querySelector('.basket__shipment');
    this._basket[options.id] = options.href;
    ul.innerHTML += `<li type="1">${this._basket[options.id]}</li>`;
  }

  _render() {
    this.element.innerHTML = ` <div class="row">

    <!--Sidebar-->
    <div class="col-md-2">
      <section>
        <p>
          Search:
          <input>
        </p>

        <p>
          Sort by:
          <select>
            <option value="name">Alphabetical</option>
            <option value="age">Newest</option>
          </select>
        </p>
      </section>

      <section class="basket">
        <p>Shopping Cart</p>
        <ul class="basket basket__shipment">

        </ul>
      </section>
    </div>

    <!--Main content-->
    <div class="col-md-10" >
 <div id="catalog"></div>
 <div id="item"></div>

    </div>
  </div>`;
  }
}