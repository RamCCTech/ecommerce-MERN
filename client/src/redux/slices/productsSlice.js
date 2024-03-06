import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        newProduct
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }) => {
    try {
      console.log(id, updatedProduct);
      const response = await axios.put(
        `http://localhost:3001/products/${id}`,
        updatedProduct
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/products/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getProductById = (state, productId) => {
  return state.products.products.find((product) => product._id === productId);
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.product);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.product.id
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(state.products);
        state.products = state.products.filter(
          (product) => product._id !== action.payload.product._id
        );
        console.log(state.products);
      });
  },
});

export const { resetProducts } = productsSlice.actions;

// Export the reducer
export default productsSlice.reducer;
