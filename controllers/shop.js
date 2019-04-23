const path = require('path');

const Product = require('../model/Product');

exports.getProductList = (req, res, next) => {
    Product.fetchAll(products => {
        res.render(path.join('shop', 'products-list.pug'), {
            products: products,
            title: 'Shop',
            path: '/'
        });
    })

}

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findProductById(productId, product => {
        res.render(path.join("shop", "product-details.pug"), {
            product: product,
        });
    });

}