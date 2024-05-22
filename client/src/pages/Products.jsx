import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, resetProducts } from "../redux/slices/productsSlice";
import ProductCard from "../components/ProductCard";
import { Button, Container, Grid, CircularProgress } from "@mui/material"; // Import CircularProgress
import { useNavigate } from "react-router";

const ERROR_FLAG_KEY = "productsErrorFlag";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const productsData = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    const hasErrorFlag = localStorage.getItem(ERROR_FLAG_KEY);

    if (hasErrorFlag) {
      dispatch(resetProducts());
      localStorage.removeItem(ERROR_FLAG_KEY);
    }
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "failed") {
      // Set the error flag in localStorage
      localStorage.setItem(ERROR_FLAG_KEY, "true");
    }
  }, [status]);

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <div
      style={{
        backgroundColor: "#CDE8E5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {status === "loading" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {status === "failed" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Error: {error}
        </div>
      )}

      {status !== "loading" && status !== "failed" && (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          {currentUser && currentUser.isAdmin && (
            <Button
              variant="contained"
              onClick={handleAddProduct}
              style={{ marginBottom: "16px" }}
            >
              Add Product
            </Button>
          )}
          <Grid container spacing={6}>
            {productsData.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                justifyContent="center"
              >
                <ProductCard productData={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
}
