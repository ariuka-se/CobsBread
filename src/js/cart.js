class cartItem {
  constructor(product) {
    this.product = product;
  }
  #Render() {
    //console.log(this.product.img);
    return `<li>
    <button class="close">x</button>
    <img
      src="${this.product.img}"
      alt="${this.product.name}"
    />
    <article><span>${this.product.name}</span><span>${this.product.price}</span></article>
    <span class="count">${this.product.count}</span>
  </li>`;
  }
  get Render() {
    return this.#Render();
  }
}

class Cart extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.
    this.products = [];
    this.bill = 0;
    // get items from local storage
    const products = JSON.parse(localStorage.getItem("cartProducts"));
    const bill = JSON.parse(localStorage.getItem("bill"));
    this.bill = bill;
    if (products) {
      this.products = products;
    }
    console.log(this.products);
    this.#Render();
    // if (this.getAttribute("color") != null) this.#Render(this.getAttribute("color"));
    // else this.#Render();
  }
  calculateTotalBill() {
    this.bill = this.products.reduce((total, product) => {
      return total + product.price * product.count;
    }, 0);
  }
  connectedCallback() {
    this.renderCartItems();
  }
  renderCartItems() {
    const basketList = this.querySelector(".basket__list");
    if (basketList) {
      basketList.innerHTML = "";

      if (this.products.length > 0) {
        this.products.forEach((product, index) => {
          const item = new cartItem(product);
          const itemElement = document.createElement("li");
          itemElement.innerHTML = item.Render;

          const closeButton = itemElement.querySelector(".close");
          closeButton.addEventListener("click", () => {
            this.Remove(index);
          });

          basketList.appendChild(itemElement);
        });
      } else {
        basketList.innerHTML = `<div style=" text-align:center;"><img src="https://media.istockphoto.com/id/1139666909/vector/shopping-cart-shop-trolley-or-basket-in-the-supermarket.jpg?s=612x612&w=0&k=20&c=_HajO7ifYKxuwzKFf-Fx9lsLKBa_1Rq9vuzGiPq8Q5Q=" alt="empty cart" /><h2>Your cart is empty</h2></div>`;
      }
    }
  }

  // renderCartItems() {
  //   const basketList = this.querySelector(".basket__list");
  //   if (basketList) {
  //     basketList.innerHTML = "";

  //     if (this.products.length > 0) {
  //       this.products.forEach((product) => {
  //         const item = new cartItem(product);
  //         basketList.insertAdjacentHTML("beforeend", item.Render);
  //       });
  //     } else {
  //       basketList.innerHTML = `<div style=" text-align:center;"><img src="https://media.istockphoto.com/id/1139666909/vector/shopping-cart-shop-trolley-or-basket-in-the-supermarket.jpg?s=612x612&w=0&k=20&c=_HajO7ifYKxuwzKFf-Fx9lsLKBa_1Rq9vuzGiPq8Q5Q=" alt="empty cart" /><h2>Your cart is empty</h2></div>`;
  //     }
  //   }
  // }

  Remove(index) {
    if (index >= 0 && index < this.products.length) {
      const removedProduct = this.products.splice(index, 1)[0];
      this.calculateTotalBill();
      localStorage.setItem("cartProducts", JSON.stringify(this.products));
      localStorage.setItem("bill", JSON.stringify(this.bill));
      this.#Render();
      this.renderCartItems();
    }
  }

  #Render() {
    this.innerHTML = `<section class="menu_right">
    <button class="basket_button1">
      <svg class="menu-icon">
        <use href="/src/img/icon.svg#basket"></use>
      </svg>
      <span class="basket">Сагс</span>
    </button>
    <article class="basket__panel">
      <ul class="basket__list"></ul>
      <article class="payment">
        <span>Нийт төлбөр</span>
        <span>${this.bill}</span>
      </article>

      <button class="accept">Баталгаажуулах</button>
    </article>
  </section>`;
  }

  AddToCart(myProduct) {
    console.log(this.products);
    const index = this.products.findIndex(
      (product) => product.name == myProduct.name
    );
    if (index != -1) {
      this.products[index].count = parseInt(this.products[index].count) + 1;
    } else {
      this.products.push(myProduct);
    }
    localStorage.setItem("cartProducts", JSON.stringify(this.products));
    this.calculateTotalBill();
    localStorage.setItem("bill", JSON.stringify(this.bill));
    this.#Render();
    this.renderCartItems();
  }
  disconnectedCallback() {
    window.removeEventListener("beforeunload", () => {
      // add products to local storage
      console.log("beforeunload");
      localStorage.setItem("cartProducts", JSON.stringify(this.products));
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const cartComponent = document.querySelector("cart-component");
  if (cartComponent) {
    cartComponent.connectedCallback();
  }
});

window.customElements.define("cart-component", Cart);
