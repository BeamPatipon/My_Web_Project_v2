// src/components/CartDrawer/CartDrawer.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  TrashIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import productImage from "../../asset/product1.webp";

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "AMD Ryzen 5 5600X",
      price: 8900,
      quantity: 1,
      image: productImage,
    },
    {
      id: 2,
      name: "NVIDIA RTX 3060",
      price: 12900,
      quantity: 1,
      image: productImage,
    },
  ]);

  // Function to calculate total
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Function to handle quantity change
  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  // Function to remove item from cart
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const isCheckout = () => {
    toggleDrawer(); // Close the drawer
    navigate("/checkout"); // Navigate to checkout page
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-96 bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">ตะกร้าสินค้า</h2>
            <button onClick={toggleDrawer} className="btn btn-ghost btn-circle">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <ShoppingBagIcon className="h-16 w-16 text-red-400 mb-4" />
              <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="p-4 border-b hover:bg-base-200">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-error">
                      {item.price.toLocaleString()} บาท
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        className="select select-bordered select-sm w-20"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <TrashIcon className="h-4 w-4 text-error" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="absolute bottom-0 w-full bg-base-100 border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">ยอดรวม:</span>
            <span className="text-xl text-error font-semibold">
              {calculateTotal().toLocaleString()} บาท
            </span>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-error flex-1" onClick={isCheckout}>
              <p className="text-white">ชำระเงิน</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
