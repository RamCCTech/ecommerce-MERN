import React from "react";
import { Typography, Rating, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getProductById, deleteProduct } from "../redux/slices/productsSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { addToCart } from "../redux/slices/cartSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Product = () => {
  const containerStyle = {
    maxWidth: 600,
    margin: "auto",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const mediaStyle = {
    maxWidth: "50%",
    height: "auto",
    marginBottom: 16,
  };
  const navigate = useNavigate();
  const { productId } = useParams();
  const productData = useSelector((state) => getProductById(state, productId));
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteProduct(productData._id));
    navigate("/products");
  };

  const handleUpdate = (event) => {
    event.stopPropagation();
    navigate(`/update-product/${productData._id}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();

    if (currentUser) {
      dispatch(
        addToCart({
          userId: currentUser._id,
          productId: productData.id,
          quantity: 1,
        })
      );
    }
    handleSnackbarOpen();
  };

  if (!productData) {
    return <div>Product not found</div>;
  }

  return (
    <div style={containerStyle}>
      <img src={productData.image} alt={productData.title} style={mediaStyle} />
      <Typography variant="h5" gutterBottom>
        {productData.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Category: {productData.category}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Price: {productData.price} Rs
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Description: {productData.description}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Rating:{" "}
        <Rating value={productData.rating.rate} precision={0.1} readOnly /> (
        {productData.rating.count} reviews)
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddShoppingCartIcon />}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
      {currentUser && currentUser.isAdmin && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      )}
      {currentUser && currentUser.isAdmin && (
        <Button
          variant="contained"
          color="info"
          startIcon={<EditIcon />}
          onClick={handleUpdate}
        >
          Edit
        </Button>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        onClick={(event) => event.stopPropagation()}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={currentUser ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {currentUser ? "Item added to cart!" : "Sign in to save your items!"}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Product;
