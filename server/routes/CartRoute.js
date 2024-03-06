const express = require("express");
const {
  getCartItemsByUserId,
  addToCart,
  removeFromCart,
} = require("../controllers/CartController");
const router = express.Router();

router.get("/:userId", getCartItemsByUserId);

router.post("/add", addToCart);

router.post("/remove", removeFromCart);

module.exports = router;
