// Define the Header component
import "./cart.js";
class Header extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <header class="header">
    <a href="index.html"
      ><img
        src="/src/img/COBS-logo.svg"
        alt="CobsBread logo"
        class="logo"
        loading="lazy"
    /></a>

    <ul class="menu_main">
      <li>
        <a
          href="product.html?category=slices"
          class="product"
          data-category="slices"
        >
          <svg class="menu-icon product">
            <use href="/src/img/icon.svg#cookie-bite"></use>
          </svg>
          Бүтээгдэхүүн</a
        >
      </li>
      <li>
        <a href="#about" class="about">
          <svg class="menu-icon about">
            <use href="/src/img/icon.svg#people-group"></use>
          </svg>
          Бидний тухай</a
        >
      </li>
      <li>
        <a href="#" class="help">
          <svg class="menu-icon help">
            <use href="/src/img/icon.svg#circle-question"></use>
          </svg>
          Тусламж</a
        >
      </li>
    </ul>
    <cart-component></cart-component>
  </header>
    `;
  }
  connectedCallback() {}
  disconnectedCallback() {}
  //attributeChangedCallback(attrName, oldVal, newVal) {}
}

window.customElements.define("custom-header", Header);
