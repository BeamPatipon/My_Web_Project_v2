import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { PlusIcon, PencilIcon, ClockIcon } from "@heroicons/react/24/outline";

const BackOfficeLayout = () => {
  const location = useLocation();

  const siders = [
    {
      name: "ประวัติสินค้า",
      path: "/backoffice/history",
      icon: <ClockIcon className="h-5 w-5" />,
    },
    {
      name: "เพิ่มหมวดหมู่สินค้า",
      path: "/backoffice/category",
      icon: <PlusIcon className="h-5 w-5" />,
    },
    {
      name: "เพิ่มสินค้า",
      path: "/backoffice/addproduct",
      icon: <PlusIcon className="h-5 w-5" />,
    },

    {
      name: "แก้ไขรายการสินค้า",
      path: "/backoffice/editproduct",
      icon: <PencilIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold">BackOffice</h2>
        </div>
        <div className="space-y-2 px-4">
          {siders.map((sider, index) => (
            <Link
              key={index}
              to={sider.path}
              className={`flex items-center gap-2 p-2 rounded-lg text-gray-700 transition duration-200 ease-in-out 
                ${
                  location.pathname === sider.path
                    ? "bg-red-100 text-red-600 font-semibold"
                    : "hover:bg-red-100 hover:text-red-600"
                }`}
            >
              {sider.icon}
              <span className="text-lg">{sider.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <div className="m-4 p-4 bg-white min-h-screen rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BackOfficeLayout;
