import { Routes, Route } from "react-router-dom";

import RootLayout from "./pages/layout/RootLayout";

import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedLayout from "./pages/protected/ProtectedLayout";
import ProtectedIndex from "./pages/protected/ProtectedIndex";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/protected" element={<ProtectedIndex />} />
      </Route>
    </Routes>
  );
}

export default App;
