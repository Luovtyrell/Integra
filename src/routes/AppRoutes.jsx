import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/yourPath" element={<YourPage />} /> */}
    </Routes>
  );
}

export default AppRoutes;
