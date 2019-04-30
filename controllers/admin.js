const path = require('path');

const Product = require('../model/Product');
const Cart = require('../model/Cart');

exports.getAddProduct = (req, res, next) => {
    res.render(path.join('admin', 'add-product.pug'), {
        title: 'Add product',
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(null, req.body.name, req.body.image, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render(path.join("admin", "admin-products.pug"), {
            title: 'Admin products',
            path: '/admin/admin-products',
            products: products
        })
    })
}

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    if (req.query.editing !== "true")
        res.redirect('/');
    Product.findProductById(productId, product => {
        if (!product)
            res.redirect('/');
        res.render(path.join("admin", "add-product"), {
            title: 'Edit product',
            path: '/admin/admin-products',
            editing: true,
            product: product
        })
    })
}

exports.postEditProduct = (req, res, next) => {
    const { productId, image, name, price, description } = req.body;
    const updatedProduct = new Product(productId, name, image, price, description);
    updatedProduct.save();
    res.redirect('/');
}

exports.getDeleteFile = (req, res, next) => {
    const id = req.params.productId;
    Product.findProductById(id, product => {
        Cart.deleteProductById(product);
    })
    Product.delete(id);
    res.redirect('/admin/admin-products');
}