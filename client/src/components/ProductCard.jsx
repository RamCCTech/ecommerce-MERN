import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../redux/slices/productsSlice";
import { useNavigate } from "react-router";
import { addToCart } from "../redux/slices/cartSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  fetchFavorites,
  setFavorite,
  removeFavorite,
} from "../redux/slices/userSlice"; // Import the removeFavorite thunk

export default function ProductCard({ productData }) {
  const cardStyle = {
    position: "relative",
    maxWidth: 300,
    height: 350,
    "@media (min-width:600px)": {
      height: 400,
    },
    cursor: "pointer",
    backgroundColor: "#EEF7FF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const mediaStyle = {
    height: 140,
    width: "95%",
    objectFit: "contain",
    "@media (min-width:600px)": {
      height: 200,
    },
  };
  const descriptionStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    WebkitLineClamp: 4,
    marginBottom: "5px",
  };
  const headingStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1,
    marginBottom: "5px",
  };
  const cardActionsStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  };
  const favoriteIconStyle = {
    position: "absolute",
    top: 8,
    right: 8,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const favoriteProducts = useSelector((state) => state.user.favoriteProducts);
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(productData._id));
    }
  };

  const handleUpdate = (event) => {
    event.stopPropagation();
    navigate(`/update-product/${productData._id}`);
  };

  const handelCardClick = () => {
    navigate(`/product/${productData._id}`);
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

  const isFavorite = currentUser && favoriteProducts.includes(productData._id);

  return (
    <div onClick={handelCardClick}>
      <Card sx={cardStyle}>
        {currentUser && (
          <IconButton
            sx={favoriteIconStyle}
            onClick={handleFavoriteClick}
            aria-label="add-to-favorites"
          >
            {isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        )}
        <CardMedia
          component="img"
          sx={mediaStyle}
          image={productData.image}
          alt={productData.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={headingStyle}
          >
            {productData.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={descriptionStyle}
          >
            {productData.description}
          </Typography>
          <Typography noWrap>Price - {productData.price} Rs</Typography>
        </CardContent>
        <CardActions sx={cardActionsStyle}>
          <IconButton onClick={handleAddToCart} aria-label="add-cart">
            <AddShoppingCartIcon />
          </IconButton>
          {currentUser && currentUser.isAdmin && (
            <IconButton onClick={handleDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )}
          {currentUser && currentUser.isAdmin && (
            <IconButton onClick={handleUpdate} aria-label="edit">
              <EditIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
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
}
