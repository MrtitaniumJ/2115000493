const asyncHandler = require('express-async-handler');
const { fetchProducts } = require('../utils/apiHelper');
const Product = require('../models/productModel');

const getTopProducts = asyncHandler(async (req, res) => {
  const { categoryname } = req.params;
  const { n = 10, page = 1, minPrice = 0, maxPrice = 10000, sort = '' } = req.query;

  const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
  let allProducts = [];

  for (const company of companies) {
    const products = await fetchProducts(company, categoryname, minPrice, maxPrice);
    allProducts = [...allProducts, ...products.map(product => ({
      ...product,
      company,
      productId: `${company}-${product.productName}-${Math.random().toString(36).substr(2, 9)}`,
    }))];
  }

  // Sorting logic
  if (sort) {
    const [key, order] = sort.split('_');
    allProducts.sort((a, b) => {
      if (order === 'asc') return a[key] - b[key];
      return b[key] - a[key];
    });
  }

  // Pagination logic
  const startIndex = (page - 1) * n;
  const paginatedProducts = allProducts.slice(startIndex, startIndex + n);

  res.json(paginatedProducts);
});

const getProductById = asyncHandler(async (req, res) => {
  const { categoryname, productid } = req.params;
  const product = await Product.findOne({ productId: productid, category: categoryname });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = { getTopProducts, getProductById };