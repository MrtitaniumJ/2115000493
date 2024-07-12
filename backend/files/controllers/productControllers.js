const productService = require('../services/productServices.js');

exports.getTopProducts = async (req, res) => {
  const { categoryname } = req.params;
  const { n = 10, page = 1, sort_by, order } = req.query;

  try {
    const products = await productService.fetchTopProducts(categoryname, n, page, sort_by, order);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductDetails = async (req, res) => {
  const { categoryname, productid } = req.params;

  try {
    const product = await productService.fetchProductDetails(categoryname, productid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};