export const renderOne = (product) => {
  const markUp = `
  <article class="product_main" data-itemid=${product.id}>
      <img
        src="${product.img}"
        alt="${product.name}"
        loading="lazy"
      />
      <span class="name">${product.name}</span>
      <article class="price-cart">
        <span>${product.price}$</span>
        <button>
          <svg class="menu-icon">
            <use href="/src/img/icon.svg#cart"></use>
          </svg>
        </button>
      </article>
    </article>
      `;
  document
    .querySelector(".product-container")
    .insertAdjacentHTML("beforeend", markUp);
};
