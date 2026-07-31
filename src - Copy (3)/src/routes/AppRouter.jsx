import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Navbar from "../components/layout/Navbar/Navbar";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Login from "../pages/login/login";
import Register from "../pages/Register/Register";
import Categories from "../pages/Categories/Categories";
import About from "../pages/About/About";
import Contact from "../pages/contect/contect";
import Wishlist from "../pages/Wishlist/Wishlist";
import NotFound from "../pages/NotFound/NotFound";
import OrderConfirmed from "../pages/OrderConfirmed/OrderConfirmed";

import AdminLogin from "../admin/AdminLogin/AdminLogin";
import Dashboard from "../admin/Dashboard/Dashboard";
import Products from "../admin/Products/Products";
import Orders from "../admin/Orders/Orders";
import Messages from "../admin/Messages/Messages";
import ProtectedRoute from "../admin/ProtectedRoute";

function AppRouter() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRouter;
