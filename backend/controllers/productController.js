const { fetchProducts, fetchProductDetails } = require('../services/productService');

const getProducts = async (req, res) => {
    const { categoryname } = req.params;
    const { n, page = 1, sort } = req.query;

    try {
        const products = await fetchProducts(categoryname, n, page, sort);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductDetails = async (req, res) => {
    const { categoryname, productid } = req.params;

    try {
        const product = await fetchProductDetails(categoryname, productid);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProducts, getProductDetails };