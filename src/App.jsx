import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import { useSelector } from "react-redux";
import PrivateRoute, { PrivateRouteAdmin } from "./components/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home/:section" element={<Home />} />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/adminpanel/:section" element={<AdminPanel />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
