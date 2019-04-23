const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const shop = require('../controllers/shop');

const router = express.Router();

router.get('/', shop.getProductList);

router.get('/products/:productId', shop.getProductDetails);

module.exports = router;