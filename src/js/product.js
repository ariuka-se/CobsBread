import { productList } from "./productList.js";

export const product = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const html = `
  <section class="filter">
    <ul>
      <li class="${category === "slices" ? "selected" : ""}">
        <a href="?category=slices">Зүсэмхэн</a>
      </li>
      <li class="${category === "bread" ? "selected" : ""}">
        <a href="?category=bread">Талх</a>
      </li>
      <li class="${category === "pastry" ? "selected" : ""}">
        <a href="?category=pastry">Амттан</a>
      </li>
      <li class="${category === "cake" ? "selected" : ""}">
        <a href="?category=cake">Бялуу</a>
      </li>
    </ul>
  </section>
  <section class="product-container">
  </section>
`;

  document.querySelector(".container").innerHTML = html;

  try {
    await productList(category, ".product-container");
  } catch (error) {
    console.error("Error:", error);
  }
};
