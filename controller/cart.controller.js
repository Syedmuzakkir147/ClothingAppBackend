const User = require("../models/userSchema");

const addCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, name, price, image } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const existing = user.Cart.find(i => i.productId === productId);

    if (existing) {
      existing.quantity++;
    } else {
      user.Cart.push({ productId, name, price, image, quantity: 1 });
    }

    await user.save();
    res.status(200).json({ success: true, cart: user.Cart });

  } catch (err) {
    res.status(500).json({ message: "Add cart failed", error: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, cart: user.Cart });

  } catch (err) {
    res.status(500).json({ message: "Get cart failed", error: err.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.user.id);
    const item = user.Cart.find(i => i.productId === productId);

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await user.save();

    res.status(200).json({ success: true, cart: user.Cart });

  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

const removeCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user.id);
    user.Cart = user.Cart.filter(i => i.productId !== productId);

    await user.save();
    res.status(200).json({ success: true, cart: user.Cart });

  } catch (err) {
    res.status(500).json({ message: "Remove failed", error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.Cart = [];
    await user.save();

    res.status(200).json({ success: true, message: "Cart cleared" });

  } catch (err) {
    res.status(500).json({ message: "Clear failed", error: err.message });
  }
};

module.exports = { addCart, getCart, updateCart, removeCart, clearCart };
