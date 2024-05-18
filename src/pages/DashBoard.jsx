import React, { useState, useEffect } from "react";
import { set } from "react-hook-form";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar.jsx";
import DashProperties from "../components/DashProperties.jsx";
import AddProperties from "../components/AddProperties.jsx";
import AllProps from "../components/AllProps.jsx";
export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tab);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex h-screen w-full flex-col md:flex-row absolute">
      <div className="w-full md:w-56 relative left-0">
        <DashSidebar />
      </div>
      <div className="w-full h-screen ">
        {tab === "properties" && <DashProperties />}
        {tab === "add" && <AddProperties />}
        {tab === "prop" && <AllProps />}
      </div>
    </div>
  );
}
