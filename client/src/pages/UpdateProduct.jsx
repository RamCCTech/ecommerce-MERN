import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "../redux/slices/productsSlice";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const productData = useSelector((state) => getProductById(state, productId));

  const [formData, setFormData] = useState({
    title: productData.title || "",
    price: productData.price || 0,
    description: productData.description || "",
    category: productData.category || "",
    image: productData.image || "",
    id: productData.id
  });

  const [validationError, setValidationError] = useState({
    title: false,
    price: false,
    description: false,
    category: false,
    image: false,
  });

  useEffect(() => {
    if (!currentUser || (currentUser && !currentUser.isAdmin)) {
      navigate("/products");
    }
  }, [currentUser, navigate]);

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
      const updatedFormData = { ...formData};
      dispatch(updateProduct({ id: productId, updatedProduct: updatedFormData }));

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
        Update Product
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
          Update Product
        </Button>
      </form>
    </Container>
  );
};

export default UpdateProduct;
