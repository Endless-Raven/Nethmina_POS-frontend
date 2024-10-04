import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import DailyReport from "./pages/DailyReport";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route element={<Billing />} path="/" />
        <Route element={<Inventory/>} path="/inv" />
        <Route element={<DailyReport/>} path="/drepot"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
