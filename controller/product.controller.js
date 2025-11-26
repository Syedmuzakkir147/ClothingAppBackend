const Product = require("../models/productSchema")
const mongoose = require("mongoose");

 const getAllProducts = async (req, res) => {
  try {
    const {search} = req.query;
    const filter = {};

    if(search) {
      filter.$or = [
      {name:{$regex: search , $options : "i"}}]
    }
    const product = await Product.aggregate([{$match : filter}]);
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 const getProductById = async (req, res) => {
  try {
    const product = await Product.aggregate([{$match: {_id: new mongoose.Types.ObjectId(req.params.id)}}]);
    return res.json({ product: product[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

 const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    console.log("Returned doc:", product);

    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


 const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};