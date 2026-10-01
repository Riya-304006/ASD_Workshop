const { readData, writeData } = require("../database/productDatabase");

async function delayReaddata() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1500);
    });

    return await readData();
}

async function getAllProducts() {
    return await delayReaddata();
}

async function getProductById(id) {
    const products = await delayReaddata();

    return products.find(x => x.id == id);
}

async function createProduct(product) {
    const products = await readData();

    products.push(product);

    await writeData(products);

    return product;
}

async function updateProduct(id, product) {
    const products = await readData();

    const index = products.findIndex(x => x.id == id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...product,
        id: id
    };

    await writeData(products);

    return products[index];
}

async function replaceProduct(id, product) {
    const products = await readData();

    const index = products.findIndex(x => x.id == id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...product,
        id: id
    };

    await writeData(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await readData();

    const index = products.findIndex(x => x.id == id);

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await writeData(products);

    return deletedProduct;
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, replaceProduct, deleteProduct};