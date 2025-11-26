const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const {
  addCart,
  getCart,
  updateCart,
  removeCart,
  clearCart,
} = require("../controller/cart.controller");

const CartRouter = express.Router();

CartRouter.post("/add", verifyToken,addCart);
CartRouter.get("/", verifyToken,getCart);
CartRouter.put("/update", verifyToken,updateCart);
CartRouter.delete("/remove",verifyToken ,removeCart);
CartRouter.delete("/clear", verifyToken ,clearCart);

module.exports = {CartRouter};


