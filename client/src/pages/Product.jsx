import React from "react";
import {
  Box,
  Typography,
  Rating,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getProductById, deleteProduct } from "../redux/slices/productsSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { addToCart } from "../redux/slices/cartSlice";
import MuiAlert from "@mui/material/Alert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  fetchFavorites,
  setFavorite,
  removeFavorite,
} from "../redux/slices/userSlice";

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const productData = useSelector((state) => getProductById(state, productId));
  const currentUser = useSelector((state) => state.user.currentUser);
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts);
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

  const handleFavoriteClick = (event) => {
    event.stopPropagation();

    if (currentUser) {
      if (favoriteProducts.includes(productData._id)) {
        dispatch(
          removeFavorite({
            userId: currentUser._id,
            productId: productData._id,
          })
        );
      } else {
        dispatch(
          setFavorite({ userId: currentUser._id, productId: productData._id })
        );
      }
    }
  };

  const isFavorite = favoriteProducts.includes(productData._id);

  if (!productData) {
    return <div>Product not found</div>;
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 80, right: 8 }}
        onClick={handleFavoriteClick}
        aria-label="add-to-favorites"
      >
        {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </IconButton>
      <Box
        component="img"
        src={productData.image}
        alt={productData.title}
        sx={{ maxWidth: "100%", height: "auto", marginBottom: 2 }}
      />
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
        sx={{ mb: 2 }}
      >
        Add to Cart
      </Button>
      {currentUser && currentUser.isAdmin && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
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
    </Box>
  );
};

export default Product;
