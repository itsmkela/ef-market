import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Shop from "./pages/shop";
import Sell from "./pages/sell";
import Dashboard from "./pages/Dashboard";
import AccountDetail from "./pages/AccountDetails";
import Buy from "./pages/Buy";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/dashboard" element={<Dashboard />} />   {/* lowercase path */}
        <Route path="/account/:id" element={<AccountDetail />} />
        <Route path="/buy/:id" element={<Buy />} />
      </Routes>
    </Router>
  );
}

export default App;