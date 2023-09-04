// Define the Header component
// class ProductDetail extends HTMLElement {
//   constructor() {
//     super();
//     const attValue = this.getAttribute("product");
//     const product = JSON.parse(attValue);
//     console.log(product);
//     this.innerHTML = `
//     <section class="product_container">
//     <section class="product_image">
//       <img
//         src="${product.img}"
//         alt="${product.name}"
//       />
//       <h5>${product.name}</h5>
//     </section>
//     <section class="product_info">
//       <p>
//         ${product.description}
//       </p>

//       <article class="product_detail">
//         <article class="product_ingre">
//           <h6>Орцны мэдээлэл</h6>
//           <ul>
//             <li> <img src="/src/imgflour.svg" alt="flour"> ${product.ingre[0]}</li>
//             <li> <img src="/src/img/flour.svg" alt="flour"> ${product.ingre[1]}</li>
//             <li> <img src="/src/img/flour.svg" alt="flour"> ${product.ingre[2]}</li>
//           </ul>
//           <article class="view_ing">
//             <button>+</button>
//             <span>Бүгдийг үзэх</span>
//           </article>
//         </article>
//         <article class="product_action">
//           <h6>Үнэ</h6>
//           <h4> ${product.price}</h4>
//           <article class="count_button">
//             <button>-</button>
//             <span>1</span>
//             <button>+</button>
//         </article>
//         <button class="basket_button">Сагслах</button>
//       </article>

//     </section>
//   </section>
//       `;
//   }
//   connectedCallback() {}
//   disconnectedCallback() {}
// }

// window.customElements.define("product-detail", ProductDetail);
class ProductDetail extends HTMLElement {
  constructor() {
    super();
    this.count = 1;
    const product = JSON.parse(localStorage.getItem("product"));
    this.innerHTML = `
    <section class="product_container" data-itemid=${product.id}>
    <section class="product_image">
      <img
        src="${product.img}"
        alt="${product.name}"
      />
      <h5>${product.name}</h5>
    </section>
    <section class="product_info">
      <p>
        ${product.description}
      </p>

      <article class="product_detail">
        <article class="product_ingre">
          <h6>Орцны мэдээлэл</h6>
          <ul>
            <li> <img src="/src/img/flour.svg" alt="flour"> ${product.ingre[0]}</li>
            <li> <img src="/src/img/flour.svg" alt="flour"> ${product.ingre[1]}</li>
            <li> <img src="/src/img/flour.svg" alt="flour"> ${product.ingre[2]}</li>
          </ul>
          <article class="view_ing">
            <button>+</button>
            <span>Бүгдийг үзэх</span>
          </article>
        </article>
        <article class="product_action">
          <h6>Үнэ</h6>
          <h4> ${product.price}</h4>
          <article class="count_button">
            <button class="minus">-</button>
            <span class="count-span">${this.count}</span>
            <button class="plus">+</button>
        </article>
        <button class="basket_button">Сагслах</button>
      </article>

    </section>
  </section>
      `;
    const plusButton = this.querySelector(".plus");
    const minusButton = this.querySelector(".minus");
    plusButton.addEventListener("click", () => {
      this.increaseCount();
    });

    minusButton.addEventListener("click", () => {
      this.decreaseCount();
    });
  }

  increaseCount() {
    this.count++;
    this.updateCountDisplay();
  }

  decreaseCount() {
    if (this.count > 1) {
      this.count--;
      this.updateCountDisplay();
    }
  }

  updateCountDisplay() {
    const countDisplay = this.querySelector(".count-span");
    if (countDisplay) {
      countDisplay.textContent = this.count;
    }
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

window.customElements.define("product-detail", ProductDetail);
