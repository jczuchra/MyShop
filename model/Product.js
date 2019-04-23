const path = require('path');
const fs = require('fs');

const rootDir = require('../util/path');

// This function reads products from file and returns file content as a JSON, if file doesn't exist it return an empty array
function readProductsFromFile(cb) {
    const p = path.join(rootDir, 'data', 'products.json');
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

// This function save products to the file, it first checks if the content is string if it's not it is being parsed. If file from path does'nt exist it creates one and save data to it.
function saveProductsToFile(products) {
    const p = path.join(rootDir, 'data', 'products.json');
    if (typeof products !== 'string')
        fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
        })
    else
        fs.writeFile(p, products, err => {
            console.log(err);
        })
}

module.exports = class Product {
    constructor(name, image, price, description) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random();
        readProductsFromFile(products => {
            products.push(this);
            products = JSON.stringify(products);
            saveProductsToFile(products);
        })
    }

    static fetchAll(cb) {
        readProductsFromFile(cb)
    }

    static findProductById(id, cb) {
        readProductsFromFile(products => {
            const product = products.find(product => product.id.toString() === id);
            cb(product);
        })
    }
}