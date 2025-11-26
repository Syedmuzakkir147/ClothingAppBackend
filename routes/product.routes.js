const express = require("express");

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controller/product.controller");

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:id", getProductById);
ProductRouter.post("/create", createProduct);
ProductRouter.put("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);

module.exports = {ProductRouter};
