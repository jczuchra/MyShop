const path = require('path');

const Product = require('../model/Product');

exports.getAddProduct = (req, res, next) => {
    res.render(path.join('admin', 'add-product.pug'), {
        title: 'Add product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.name, req.body.image, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
}