import { about } from "./js/about.js";
import { product } from "./js/product.js";
import "./js/productDetail.js";
import { getOne } from "./js/server.js";
// import { RecommendedProduct } from "../model/recommendedProduct.js";
// import * as recommendedProductView from "./js/reccommendation.js";

// const state = {};

// const ControlRecomendedProduct = async () => {
//   try {
//     state.RecommendedProduct = new RecommendedProduct();
//     await state.RecommendedProduct.getRecommendedProduct();
//     recommendedProductView.renderProducts(state.RecommendedProduct);
//   } catch (error) {
//     console.error("Error in ControlRecomendedProduct:", error);
//   }
// };

// // Wait for the window to load and then call ControlRecomendedProduct
// window.onload = () => {
//   ControlRecomendedProduct();
// };
const slider = document.querySelector(".slider_products");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const view = document.querySelector(".view_product");

document.addEventListener("DOMContentLoaded", function () {
  const isAboutPage = window.location.hash.includes("about");
  if (isAboutPage) {
    document.querySelector(".about").classList.add("active");
    about();
  }
  document.querySelector(".menu_main").addEventListener("click", async (e) => {
    const menuItems = document.querySelectorAll(
      ".menu_main .product, .menu_main .about, .menu_main .help"
    );
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    if (e.target.matches('.about, [class^="about"]')) {
      document.querySelector(".about").classList.add("active");
      about();
    } else if (e.target.matches('.help, [class^="help"]')) {
      document.querySelector(".help").classList.add("active");
      console.log("help");
    }
  });
  if (document.querySelector(".back")) {
    document.querySelector(".back").addEventListener("click", (e) => {
      window.location.href = "index.html";
    });
  }
});
let slideIndex = 0;

prevBtn.addEventListener("click", () => {
  slideIndex--;
  slider.children[slideIndex + 1].style.display = "none";
  if (slideIndex < 0) {
    slideIndex = slider.children.length - 1;
  }
  slider.children[slideIndex].style.display = "block";
});

nextBtn.addEventListener("click", () => {
  slideIndex++;
  slider.children[slideIndex - 1].style.display = "none";
  if (slideIndex >= slider.children.length) {
    slideIndex = 0;
  }
  slider.children[slideIndex].style.display = "block";
});
view.addEventListener("click", async () => {
  const visibleSlide = slider.children[slideIndex];

  if (visibleSlide) {
    const id = visibleSlide.getAttribute("id");
    try {
      const product = await getOne(
        "https://api.jsonbin.io/v3/b/644653748e4aa6225e8fda93",
        id
      );
      localStorage.setItem("product", JSON.stringify(product));
      const html = `
      <product-detail product=></product-detail>
      `;

      document.querySelector(".container").innerHTML = html;
      //container.innerHTML = "";
    } catch (error) {
      alert(error);
    }
  } else {
    console.log("No visible product found.");
  }
});
