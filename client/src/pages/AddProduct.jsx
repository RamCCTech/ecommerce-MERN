import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/slices/productsSlice";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  const [validationError, setValidationError] = useState({
    title: false,
    price: false,
    description: false,
    category: false,
    image: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const isValid = validateForm();

    if (isValid) {
      // Assign an id to the formData
      const updatedFormData = { ...formData, id: Date.now().toString(36) };

      // Dispatch the addProduct action with the updated formData
      dispatch(addProduct(updatedFormData));

      // Clear the form data
      setFormData({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
      });

      // Redirect to the products page
      navigate("/products");
    }
  };

  const validateForm = () => {
    const errors = {
      title: !formData.title.trim(),
      price: isNaN(formData.price) || formData.price <= 0,
      description: !formData.description.trim(),
      category: !formData.category.trim(),
      image: !formData.image.trim(),
    };

    setValidationError(errors);

    return !Object.values(errors).some((error) => error);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={validationError.title}
          helperText={validationError.title && "Title is required"}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={validationError.price}
          helperText={
            validationError.price && "Price must be a positive number"
          }
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={validationError.description}
          helperText={validationError.description && "Description is required"}
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={validationError.category}
          helperText={validationError.category && "Category is required"}
        />
        <TextField
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={validationError.image}
          helperText={validationError.image && "Image URL is required"}
        />

        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
