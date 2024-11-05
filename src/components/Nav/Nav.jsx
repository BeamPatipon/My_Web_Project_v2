import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import LoginModal from "../LoginModal/LoginModal";
import Drawer from "../CartDrawer/CartDrawer";
import Swal from "sweetalert2";

const Nav = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "AMD Ryzen 5 5600X", quantity: 1 },
    { id: 2, name: "NVIDIA RTX 3060", quantity: 1 },
  ]);

  const openModal = () => {
    document.getElementById("login_modal").showModal();
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token) {
      setIsLoggedIn(true);
      if (user && user.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);

    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have successfully logged out.",
      confirmButtonText: "OK",
    });

    navigate("/");
  };

  return (
    <>
      <div className="shadow-lg border-b">
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-4">
            <div className="btn btn-ghost normal-case text-xl w-1/2">
              <Link to="/">IHAVECOM</Link>
            </div>
            <div className="col-span-2">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </span>
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า"
                  className="input input-bordered w-full pl-10 rounded-full"
                />
              </div>
            </div>
            <div className="flex gap-4 px-4 ml-auto">
              {/* Show ArchiveBoxIcon only if user is admin */}
              {isAdmin && (
                <button
                  className="btn btn-circle btn-error"
                  onClick={() => navigate("/backoffice/history")}
                >
                  <ArchiveBoxIcon className="h-4 w-4 text-white" />
                </button>
              )}

              {/* User Icon or Avatar with Dropdown */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-circle avatar">
                      <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
                    >
                      <li>
                        <button onClick={() => navigate("/orders")}>
                          คำสั่งซื้อสินค้า
                        </button>
                      </li>
                      <li>
                        <button onClick={handleLogout}>ออกจากระบบ</button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <button className="btn btn-circle" onClick={openModal}>
                    <UserIcon className="h-4 w-4" />
                  </button>
                )}
              </div>

              <button
                className="btn btn-circle relative"
                onClick={toggleDrawer}
              >
                <ShoppingBagIcon className="h-4 w-4 text-red-500" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <LoginModal />

      <Drawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        cartItems={cartItems}
      />
    </>
  );
};

export default Nav;
