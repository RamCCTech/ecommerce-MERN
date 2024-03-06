import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/cart/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await axios.post("http://localhost:3001/cart/add", {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.post("http://localhost:3001/cart/remove", {
        userId,
        productId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.products = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.cartItems
          ? action.payload.cartItems.products
          : [];
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload.product;

        const existingProductIndex = state.products
          ? state.products.findIndex(
              (product) => product.productId === productId
            )
          : -1;

        if (existingProductIndex !== -1) {
          state.products[existingProductIndex].quantity = quantity;
        } else {
          state.products.push({
            productId,
            quantity,
          });
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product.productId !== action.payload.productId
        );
      });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
