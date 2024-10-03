import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import Test from "./pages/Test";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route element={<Billing />} path="/" />
        <Route element={<Inventory/>} path="/inv" />
        <Route element={<Test/>} path="/test" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
