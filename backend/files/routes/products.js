const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers.js');

router.get('/', productController.getTopProducts);
router.get('/:productid', productController.getProductDetails);

module.exports = router;