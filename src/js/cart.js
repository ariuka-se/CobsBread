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
    <span class="count">1</span>
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
    if (products) {
      this.products = products;
    }
    console.log(this.products);
    this.#Render();
    // if (this.getAttribute("color") != null) this.#Render(this.getAttribute("color"));
    // else this.#Render();
  }
  connectedCallback() {
    this.renderCartItems();
  }

  renderCartItems() {
    const basketList = this.querySelector(".basket__list");
    if (basketList) {
      basketList.innerHTML = ""; // Clear existing content

      if (this.products.length > 0) {
        this.products.forEach((product) => {
          const item = new cartItem(product);
          basketList.insertAdjacentHTML("beforeend", item.Render);
        });
      } else {
        basketList.innerHTML = `<div style=" text-align:center;"><img src="https://media.istockphoto.com/id/1139666909/vector/shopping-cart-shop-trolley-or-basket-in-the-supermarket.jpg?s=612x612&w=0&k=20&c=_HajO7ifYKxuwzKFf-Fx9lsLKBa_1Rq9vuzGiPq8Q5Q=" alt="empty cart" /><h2>Your cart is empty</h2></div>`;
      }
    }
  }

  // remove all items from cart
  Remove(id) {
    this.products = [];
    // remove from local storage
    const products = localStorage.getItem("cartProducts");
    localStorage.removeItem("products");
    this.#Render();
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
        <span>15000</span>
      </article>

      <button class="accept">Баталгаажуулах</button>
    </article>
  </section>`;
  }

  AddToCart(myProduct) {
    console.log(this.products);
    //document.querySelector(".basket__list").innerHTML = "vfdshnfgvsdh";
    const index = this.products.findIndex(
      (product) => product.name == myProduct.name
    );
    if (index != -1) {
      this.products[index].count = parseInt(this.products[index].count) + 1;
    } else {
      this.products.push(myProduct);
    }

    this.#Render();
    localStorage.setItem("cartProducts", JSON.stringify(this.products));
  }
  //   connectedCallback() {
  //     // get items from local storage
  //     document.addEventListener("DOMContentLoaded", () => {
  //       this.connectedCallbackInternal();
  //     });
  //   }
  //   connectedCallbackInternal() {
  //     console.log("connectedCallback");
  //     const products = JSON.parse(localStorage.getItem("cartProducts"));
  //     const basketList = document.querySelector(".basket__list");

  //     if (products.length > 0) {
  //       try {
  //         products.forEach((product) => {
  //           const item = new cartItem(product);
  //           const renderedItem = item.Render;
  //           console.log(renderedItem);
  //           basketList.insertAdjacentHTML("beforeend", renderedItem);
  //         });
  //       } catch (error) {
  //         alert(error);
  //       }
  //     } else if (!products.length) {
  //       basketList.innerHTML = `<div style="text-align:center;"><img src="https://media.istockphoto.com/id/1139666909/vector/shopping-cart-shop-trolley-or-basket-in-the-supermarket.jpg?s=612x612&w=0&k=20&c=_HajO7ifYKxuwzKFf-Fx9lsLKBa_1Rq9vuzGiPq8Q5Q=" alt="empty cart" /><h2>your cart is empty</h2></div>`;
  //     }

  //     if (products != null) {
  //       this.products = products;
  //       this.#Render();
  //       console.log(document.querySelector(".basket__list").innerHTML);
  //     }
  //     // add event listener before unload
  //     window.addEventListener("beforeunload", () => {
  //       // add products to local storage
  //       console.log("beforeunload");
  //       // set items to local storage only if count is greater than 0
  //       const products = this.products.filter((product) => product.count > 0);
  //       localStorage.setItem("cartProducts", JSON.stringify(products));
  //     });
  //   }
  disconnectedCallback() {
    // add products to local storage
    // remove eventlistener
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
    cartComponent.connectedCallback(); // Manually call connectedCallback
  }
});

window.customElements.define("cart-component", Cart);
