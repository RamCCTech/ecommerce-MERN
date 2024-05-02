import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Products from "./pages/Products";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Cart from "./pages/Cart";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route
          path="/update-product/:productId"
          element={
            <ProtectedAdminRoute>
              <UpdateProduct />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedAdminRoute>
              <AddProduct />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
