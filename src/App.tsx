import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cars/:_id" element={<CarDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout/:_id" element={<Checkout />} />
        </Route>
      </Route>
    </Routes>
  );
}
