import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}
