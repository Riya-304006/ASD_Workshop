const express = require("express");

const {getProducts,getProduct, createProductController,putProduct,patchProduct, deleteProductController} = require("../controllers/productController");

const { cacheMiddleware } = require("../middleware/cacheMiddleware");

const router = express.Router();


router.get("/products", cacheMiddleware, getProducts);

router.get("/products/:id", cacheMiddleware, getProduct);

router.post("/products", createProductController);

router.put("/products/:id", putProduct);

router.patch("/products/:id", patchProduct);

router.delete("/products/:id", deleteProductController);


module.exports = router;