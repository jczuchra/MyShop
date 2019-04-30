const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/admin-products', adminController.getAdminProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product/:productId', adminController.postEditProduct);

router.get('/delete/:productId', adminController.getDeleteFile);

module.exports = router;