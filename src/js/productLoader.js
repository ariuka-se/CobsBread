import { product } from "./product.js";
import { getOne } from "./server.js";
import "./productDetail.js";
import "./cart.js";

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(
    ".menu_main .about, .menu_main .help"
  );
  document.querySelector(".product").classList.add("active");
  product();
  document.querySelector(".menu_main").addEventListener("click", async (e) => {
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });

    if (e.target.matches('.about, [class^="about"]')) {
      document.querySelector(".about").classList.add("active");
      window.location.href = "/src/index.html#about";
    } else if (e.target.matches('.help, [class^="help"]')) {
      document.querySelector(".help").classList.add("active");
      console.log("help");
    }
  });
});
document.querySelector(".container").addEventListener("click", async (e) => {
  const target = e.target;
  console.log(target);
  let id,
    name = "product",
    product;
  if (target.matches(".menu-icon") || target.tagName === "use") {
    id =
      target.parentElement.parentElement.parentElement.getAttribute(
        "data-itemid"
      );
    name = "cart";
  } else if (target.matches(".product_main")) {
    id = target.getAttribute("data-itemid");
  } else if (target.parentElement.matches(".product_main")) {
    id = target.parentElement.getAttribute("data-itemid");
  }
  console.log(id);
  if (id) {
    try {
      product = await getOne(
        "https://api.jsonbin.io/v3/b/644653748e4aa6225e8fda93",
        id
      );
      console.log(product);
      if (name === "product") {
        localStorage.setItem("product", JSON.stringify(product));
        const html = `
        <product-detail></product-detail>
      `;
        document.querySelector(".container").innerHTML = html;
      }
    } catch (error) {
      alert(error);
    }
  }
  if (target.matches(".menu-icon") || target.tagName === "use") {
    //alert("Added to the cart");
    console.log(product.name);
    const myCart = document.querySelector("cart-component");
    myCart.AddToCart({
      name: product.name,
      img: product.img,
      price: product.price,
      count: 1,
    });
  }
});
