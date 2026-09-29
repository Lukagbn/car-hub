// src/App.tsx
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
