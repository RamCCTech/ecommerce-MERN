const CartItem = require("../models/CartModel");

module.exports.getCartItemsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartItem.findOne({ userId });

    res.json({ success: true, cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.addToCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;

    const existingCartItem = await CartItem.findOne({ userId });

    let finalProduct;

    if (existingCartItem) {
      // If user already has a cart, check if the product is already in the cart
      const existingProduct = existingCartItem.products.find(
        (product) => product.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
        finalProduct = existingProduct;
      } else {
        existingCartItem.products.push({ productId, quantity });
        finalProduct = { productId, quantity };
      }
      await existingCartItem.save();
    } else {
      await CartItem.create({
        userId,
        products: [{ productId, quantity }],
      });
      finalProduct = { productId, quantity };
    }

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      product: finalProduct,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.removeFromCart = async (req, res, next) => {
  try {
    console.log("Hi in remove cort");
    const { userId, productId } = req.body;

    const existingCartItem = await CartItem.findOne({ userId });

    if (!existingCartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the user",
      });
    }

    existingCartItem.products = existingCartItem.products.filter(
      (product) => product.productId.toString() !== productId
    );

    await existingCartItem.save();

    res.json({
      success: true,
      message: "Item removed from cart successfully",
      productId,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
