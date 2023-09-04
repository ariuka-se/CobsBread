//product list avah
export const get = async (url) => {
  const response = await fetch(url);
  return await response.json();
};
export const getOne = async (url, id) => {
  const response = await fetch(url);
  const data = await response.json();
  const products = data.record;
  if (!Array.isArray(products)) {
    return "Products not array";
  }
  const product = products.find((item) => item.id === id);
  return product;
};
