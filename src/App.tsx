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

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/saved" element={<Saved />} />
      </Route>
    </Routes>
  );
}

export default App;
