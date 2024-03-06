import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
} from "@mui/material";
import { removeFromCart, fetchCartItems } from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.products.products);
  const cartProducts = useSelector((state) => state.cart.products);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartError = useSelector((state) => state.cart.error);

  useEffect(() => {
    if (cartStatus === "idle" && currentUser) {
      // Fetch cart items when the component mounts and the cart status is idle
      dispatch(fetchCartItems(currentUser._id));
    }
  }, [dispatch, cartStatus, currentUser]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({
      userId: currentUser._id,
      productId: itemId,
    }));
  };

  if (cartStatus === "loading") {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  } else if (cartStatus === "failed") {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error loading cart: {cartError}
        </Typography>
      </Container>
    );
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>

      {cartProducts && cartProducts.length > 0 ? (
        <Grid container spacing={2}>
          {cartProducts.map((element) => {
            const product = products.find((p) => p.id === element.productId);
            if (!product) {
              return null;
            }
            return (
              <Grid item key={element.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="Product Image"
                    height={200} // Set the height to accommodate the full image
                    image={product.image}
                    style={{ objectFit: "cover" }} // Ensure the image covers the entire CardMedia
                  />
                  <CardContent>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography>Price: {product.price} Rs</Typography>
                    <Typography>Quantity: {element.quantity}</Typography>
                    <Typography>
                      Total Price: {product.price * element.quantity} Rs
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveItem(element.productId)}
                    >
                      Remove Item
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography>No items in the cart</Typography>
      )}
    </Container>
  );
};

export default Cart;
