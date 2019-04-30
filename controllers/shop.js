const path = require('path');

const Product = require('../model/Product');
const Cart = require('../model/Cart');

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
        if (typeof product === 'undefined')
            res.redirect('/productNotFound');
        else
            res.render(path.join("shop", "product-details.pug"), {
                product: product,
            });
    });

}

exports.getCart = (req, res, next) => {
    let cartProducts = [];
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            cart.products.forEach(element => {
                const newProd = products.find(prod => prod.id === element.id);
                if (!newProd)
                    return
                newProd.qty = element.qty;
                cartProducts.push(newProd);
            })
            res.render(path.join('shop', 'cart.pug'), {
                title: 'Cart',
                path: '/cart',
                products: cartProducts
            })
        })

    })
}

exports.postCart = (req, res, next) => {
    console.log(req.body.productId);
    Product.findProductById(req.body.productId, product => {
        Cart.addProduct(product.id, product.price);
    })

    res.redirect('/');
}

exports.postDeleteCartProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findProductById(productId, product => {
        Cart.deleteProductById(product);
        res.redirect('/cart')
    })
}