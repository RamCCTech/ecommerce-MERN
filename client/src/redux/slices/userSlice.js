import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  favoriteProducts: [],
  favoritesLoading: false,
  favoritesError: null,
};

export const fetchFavorites = createAsyncThunk(
  "user/fetchFavorites",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/${userId}/favorite`
      );
      return response.data.favoriteProducts;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const setFavorite = createAsyncThunk(
  "user/setFavorite",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/${userId}/favorite`,
        { productId }
      );
      return response.data.user.favoriteProducts;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "user/removeFavorite",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/user/${userId}/favorite`,
        { data: { productId } }
      );
      return response.data.user.favoriteProducts;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoritesLoading = false;
        state.favoriteProducts = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload;
      })
      .addCase(setFavorite.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        state.favoritesLoading = false;
        state.favoriteProducts = action.payload;
      })
      .addCase(setFavorite.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload;
      })
      .addCase(removeFavorite.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favoritesLoading = false;
        state.favoriteProducts = action.payload;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload;
      });
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;