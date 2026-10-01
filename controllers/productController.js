const { getAllProducts, getProductById, createProduct, updateProduct, replaceProduct, deleteProduct } = require("../services/productService");

const { clearCache } = require("../middleware/cacheMiddleware");


async function getProducts(req, res) {
    try {
        const products = await getAllProducts();

        return res.sendCached(products);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}


async function getProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await getProductById(id);

        return res.sendCached(product);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}


async function createProductController(req, res) {
    try {
        const product = await createProduct(req.body);

        clearCache();

        return res.status(201).json(product);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}


async function putProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await replaceProduct(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        clearCache();

        return res.json(product);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}


async function patchProduct(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await updateProduct(id, req.body);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        clearCache();

        return res.json(product);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}


async function deleteProductController(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await deleteProduct(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        clearCache();

        return res.json(product);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}


module.exports = { getProducts, getProduct, createProductController, putProduct,patchProduct,deleteProductController};