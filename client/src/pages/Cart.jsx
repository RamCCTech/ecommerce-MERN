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
import DeleteIcon from "@mui/icons-material/Delete";
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
      dispatch(fetchCartItems(currentUser._id));
    }
  }, [dispatch, cartStatus, currentUser]);

  const handleRemoveItem = (itemId) => {
    dispatch(
      removeFromCart({
        userId: currentUser._id,
        productId: itemId,
      })
    );
  };

  const calculateTotals = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartProducts.forEach((element) => {
      const product = products.find((p) => p.id === element.productId);
      if (product) {
        totalQuantity += element.quantity;
        totalPrice += product.price * element.quantity;
      }
    });
    return { totalQuantity, totalPrice };
  };

  if (cartStatus === "loading") {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#EEF7FF",
        }}
      >
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

  const { totalQuantity, totalPrice } = calculateTotals();

  return (
    <Container sx={{ mt: 4, bgcolor: "#EEF7FF", borderRadius: 2, p: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", color: "#4D869C" }}
      >
        Cart
      </Typography>
      {cartProducts && cartProducts.length > 0 && (
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            bgcolor: "#CDE8E5",
            borderRadius: 2,
            p: 2,
            mb: 4,
          }}
        >
          <Typography variant="h6" sx={{ color: "#7AB2B2" }}>
            Total Products: {totalQuantity}
          </Typography>
          <Typography variant="h6" sx={{ color: "#7AB2B2" }}>
            Total Price:{" "}
            {totalPrice.toLocaleString(undefined, { maximumFractionDigits: 3 })}{" "}
            Rs
          </Typography>
        </Container>
      )}
      {cartProducts && cartProducts.length > 0 ? (
        <Grid container spacing={2} >
          {cartProducts.map((element) => {
            const product = products.find((p) => p.id === element.productId);
            if (!product) {
              return null;
            }
            return (
              <Grid item key={element.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    bgcolor: "#CDE8E5",
                    borderRadius: 2,
                    border: "1px solid #7AB2B2", // Added border styling
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Product Image"
                    height="200" // Fixed height for all images
                    image={product.image}
                    sx={{
                      objectFit: "contain", // Cover scales the image while maintaining aspect ratio
                      borderRadius: "8px", // Optional: adds rounded corners to the image
                    }}
                  />
                  <CardContent>
                    <Typography variant="h5" sx={{ color: "#4D869C" }}>
                      {product.name}
                    </Typography>
                    <Typography sx={{ color: "#4D869C" }}>
                      Price: {product.price} Rs
                    </Typography>
                    <Typography sx={{ color: "#4D869C" }}>
                      Quantity: {element.quantity}
                    </Typography>
                    <Typography sx={{ color: "#4D869C" }}>
                      Total Price:{" "}
                      {(product.price * element.quantity).toLocaleString(
                        undefined,
                        { maximumFractionDigits: 3 }
                      )}{" "}
                      Rs
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => handleRemoveItem(element.productId)}
                      sx={{ mt: 2 }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography
          variant="h6"
          sx={{ mt: 4, textAlign: "center", color: "#4D869C" }}
        >
          No items in the cart
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
