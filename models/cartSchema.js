const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 }
    },
  ],
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart
