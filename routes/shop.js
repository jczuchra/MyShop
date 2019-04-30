const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getProductList);

router.get('/products/:productId', shopController.getProductDetails);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/delete-cart-product', shopController.postDeleteCartProduct)

module.exports = router;