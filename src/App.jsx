import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route element={<Billing />} path="/" />
        <Route element={<Inventory/>} path="/inv" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
