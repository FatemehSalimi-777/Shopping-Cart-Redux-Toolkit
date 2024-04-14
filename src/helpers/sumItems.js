export const sumPrice = (products) => {
  return products
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
};

export const sumQuntity = (products) => {
  return products.reduce((counter, product) => counter + product.quantity, 0);
};
