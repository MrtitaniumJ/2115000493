const axios = require('axios');

const API_URL = 'http://20.244.56.144/test/companies/AMZ';

exports.fetchTopProducts = async (categoryname, n, page, sort_by, order) => {
  const params = {
    n: Math.min(n, 10),
    page,
    sort_by,
    order
  };

//   const response = await axios.get(`${API_URL}/categories/${categoryname}/products, { params }`);
  const response = await axios.get(`${API_URL}/categories/Laptop/products`);
  const products = response.data;
  const productsWithId = products.map(product => ({
    ...product,
    custom_id: generateUniqueId(product)
  }));
  console.log(productsWithId);
  return productsWithId;
};

exports.fetchProductDetails = async (categoryname, productid) => {
  const response = await axios.get(`${API_URL}/categories/${categoryname}/products/${productid}`);
  return response.data;
};

const generateUniqueId = (product) => {
  return `${product.company}-${product.id}`;
};