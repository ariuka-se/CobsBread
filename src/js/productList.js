import { get } from "./server.js";
import { renderOne } from "./oneProduct.js";
export const productList = async (category) => {
  try {
    get("https://api.jsonbin.io/v3/b/644653748e4aa6225e8fda93").then((data) => {
      const products = data.record;
      const filterResult = products.filter(
        (product) => product.category === category
      );
      filterResult.forEach((product) => renderOne(product));
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
