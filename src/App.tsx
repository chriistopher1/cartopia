import { Routes, Route } from "react-router-dom";

import RootLayout from "./pages/layout/RootLayout";

import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
