import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../redux/slices/productsSlice";
import { useNavigate } from "react-router";
import { addToCart } from "../redux/slices/cartSlice";

export default function ProductCard({ productData }) {
  const cardStyle = {
    position: "relative",
    maxWidth: 300,
    height: 350,
    "@media (min-width:600px)": {
      height: 400,
    },
    cursor: "pointer",
  };
  const mediaStyle = {
    height: 140,
    width: "100%",
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteProduct(productData._id));
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
    dispatch(
      addToCart({
        userId: currentUser._id,
        productId: productData.id,
        quantity: 1,
      })
    );
  };
  return (
    <div onClick={handelCardClick}>
      <Card sx={cardStyle}>
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
    </div>
  );
}
