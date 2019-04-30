const path = require('path');

const fs = require('fs');

const rootDir = require('../util/path');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        const p = path.join(rootDir, 'data', 'cart.json');
        let cart;
        fs.readFile(p, (err, fileContent) => {
            if (err)
                cart = { products: [], totalPrice: 0 };
            else
                cart = JSON.parse(fileContent);
            let currentProductIndex = cart.products.findIndex(product => product.id === id);
            let currentProduct;
            if (currentProductIndex != -1) {
                currentProduct = cart.products[currentProductIndex];
                currentProduct.qty += 1;
                cart.products[currentProductIndex] = currentProduct;
            }
            else {
                currentProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, currentProduct];
            }

            cart.totalPrice += +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static deleteProductById(product) {
        const p = path.join(rootDir, 'data', 'cart.json');
        fs.readFile(p, (err, fileContent) => {
            if (err)
                console.log(err);
            else {
                const cart = JSON.parse(fileContent);
                const productIndex = cart.products.findIndex(cartProduct => cartProduct.id === product.id);
                const updatedPrice = cart.totalPrice - cart.products[productIndex].qty * product.price;
                const updatedProducts = cart.products.filter(cartProduct => cartProduct.id !== product.id);
                const updatedCart = {
                    products: updatedProducts,
                    totalPrice: updatedPrice
                };
                fs.writeFile(p, JSON.stringify(updatedCart), err => {
                    console.log(err);
                })
            }
        })
    }

    static getCart(cb) {
        const p = path.join(rootDir, 'data', 'cart.json');
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            cb(cart)
        })
    }
}