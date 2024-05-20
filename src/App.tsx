import { Routes, Route } from "react-router-dom";

import RootLayout from "./pages/layout/RootLayout";

import Dashboard from "./pages/root/Dashboard";
import About from "./pages/root/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedLayout from "./pages/layout/ProtectedLayout";
import AuthLayout from "./pages/layout/AuthLayout";
import Shop from "./pages/root/Shop";
import Blog from "./pages/root/Blog";
import Contact from "./pages/root/Contact";
import Cart from "./pages/protected/Cart";
import Saved from "./pages/protected/Saved";
import Product from "./pages/root/Product";
import Profile from "./pages/protected/Profile";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerLayout from "./pages/layout/SellerLayout";
import SellerRegister from "./pages/seller/SellerRegister";
import SellerDeleteProduct from "./pages/seller/SellerDeleteProduct";
import SellerUpdateProduct from "./pages/seller/SellerUpdateProduct";
import SellerAddProduct from "./pages/seller/SellerAddProduct";
import Order from "./pages/protected/order/Order";
import OrderPending from "./pages/protected/order/OrderPending";
import OrderShipping from "./pages/protected/order/OrderShipping";
import OrderComplete from "./pages/protected/order/OrderComplete";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/order" element={<Order />} />
        <Route path="/user/order/pending" element={<OrderPending />} />
        <Route path="/user/order/shipping" element={<OrderShipping />} />
        <Route path="/user/order/complete" element={<OrderComplete />} />
      </Route>

      <Route element={<SellerLayout />}>
        <Route path="/seller/dashboard" element={<SellerDashboard />}></Route>
        <Route
          path="/seller/add-product"
          element={<SellerAddProduct />}
        ></Route>
        <Route
          path="/seller/update-product"
          element={<SellerUpdateProduct />}
        ></Route>
        <Route
          path="/seller/delete-product"
          element={<SellerDeleteProduct />}
        ></Route>
      </Route>

      <Route path="/seller/register" element={<SellerRegister />}></Route>
    </Routes>
  );
}

export default App;
