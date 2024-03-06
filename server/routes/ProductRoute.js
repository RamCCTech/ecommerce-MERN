const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

// Get all products
router.get("/", getProducts);

// Add a new product
router.post("/", addProduct);

// Update a product by ID
router.put("/:id", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
