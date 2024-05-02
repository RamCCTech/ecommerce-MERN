const Product = require("../models/ProductModel");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      // If no products exist, fetch from the external API
      const externalProducts = await fetch(
        "https://fakestoreapi.com/products"
      ).then((res) => res.json());
      console.log("called");

      const modifiedProducts = externalProducts.map((product) => ({
        ...product,
        price: product.price * 80,
      }));

      // Save fetched products to MongoDB
      const savedProducts = await Product.insertMany(modifiedProducts);

      // Return the saved products, including the generated _id from MongoDB
      console.log("saved to mongo:", savedProducts);
      return res.json(savedProducts);
    }
    console.log("called mongo get products");
    return res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await Product.create(newProduct);
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;

    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
