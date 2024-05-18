import { Sidebar } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { IoAddCircleSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function DashSidebar() {
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
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example  "
      className="w-full md:w-56  "
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item> */}
          {/* <Sidebar.Collapse
            icon={HiShoppingBag}
            label="E-commerce"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return (
                <IconComponent
                  aria-hidden
                  className={twMerge(
                    theme.label.icon.open[open ? "on" : "off"]
                  )}
                />
              );
            }}
          >
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse> */}
          <Link to={`/dashboard?tab=prop`}>
            <Sidebar.Item href="#" icon={HiInbox} active={tab === "properties"}>
              Properties
            </Sidebar.Item>
          </Link>
          <Link to={`/dashboard?tab=add`}>
            <Sidebar.Item
              href="#"
              icon={IoAddCircleSharp}
              active={tab === "add"}
            >
              Add properties
            </Sidebar.Item>
          </Link>

          <Sidebar.Item href="#" icon={HiTable}>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
