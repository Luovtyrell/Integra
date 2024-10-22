import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Pluja from "../pages/Pluja";
import Temp from "../pages/Temp";
import Vegetacio from "../pages/Vegetacio";
import Indice from "../pages/Indice";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pluja" element={<Pluja />} />
      <Route path="/temp" element={<Temp />} />
      <Route path="/vegetacio" element={<Vegetacio />} />
      <Route path="/indice" element={<Indice />} />
    </Routes>
  );
}

export default AppRoutes;
