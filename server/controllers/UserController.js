const Product = require("../models/ProductModel");
const User = require("../models/UserModel");

module.exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.setUserFavorite = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (!user.favoriteProducts.includes(productId)) {
      user.favoriteProducts.push(productId);
      await user.save();
    }

    res.json({ success: true, message: "Product added to favorites", user });
  } catch (error) {
    console.error("Error setting favorite product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.getUserFavorite = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("favoriteProducts");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, favoriteProducts: user.favoriteProducts });
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports.removeUserFavorite = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const productIndex = user.favoriteProducts.indexOf(productId);
    if (productIndex > -1) {
      user.favoriteProducts.splice(productIndex, 1);
      await user.save();
    }

    res.json({ success: true, message: "Product removed from favorites", user });
  } catch (error) {
    console.error("Error removing favorite product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
