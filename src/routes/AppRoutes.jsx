import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import RainPage from "../pages/home/RainPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/RainPage" element={<RainPage />} />
      {/* <Route path="/yourPath" element={<YourPage />} /> */}
    </Routes>
  );
}

export default AppRoutes;
