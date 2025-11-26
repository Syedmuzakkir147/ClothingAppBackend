const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    // required: true,
    enum: ["user", "admin"],
    default: "user",
  },

  Cart: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
