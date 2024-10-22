import React from "react";
import { CloudRain } from "lucide-react";
import { ThermometerSun } from "lucide-react";
import { TreePine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NavbarFooter() {
  const location = useLocation();
  const page1 = "/forecast1";
  const page2 = "/forecast2";
  const page3 = "/forecast3";

  return (
    <div className="flex justify-center py-1">
      <div className="w-12 flex justify-center items-center">
        <Link to={page1}>
          <CloudRain size={location.pathname == page1 ? 32 : 24} />
        </Link>
      </div>
      <div className="w-12 flex justify-center items-center">
        <Link to={page2}>
          <ThermometerSun size={location.pathname == page2 ? 32 : 24} />
        </Link>
      </div>
      <div className="w-12 flex justify-center items-center">
        <Link to={page3}>
          <TreePine size={location.pathname == page3 ? 32 : 24} />
        </Link>
      </div>
    </div>
  );
}
