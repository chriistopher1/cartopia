import { Routes, Route } from "react-router-dom";

import RootLayout from "./pages/layout/RootLayout";

import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedLayout from "./pages/layout/ProtectedLayout";
import ProtectedIndex from "./pages/protected/ProtectedIndex";
import AuthLayout from "./pages/layout/AuthLayout";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/protected" element={<ProtectedIndex />} />
      </Route>
    </Routes>
  );
}

export default App;
