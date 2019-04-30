const express = require('express');

const errorController = require('../controllers/error');

const router = express.Router();

router.get('/productNotFound', errorController.getProductNotFoundError);

router.use(errorController.getError404);

module.exports = router;