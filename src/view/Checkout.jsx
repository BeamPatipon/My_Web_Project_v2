// src/pages/Checkout.js
import React, { useState } from "react";
import productImage from "../asset/product1.webp";

const Checkout = () => {
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

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">ชำระเงิน</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Summary */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">รายการสินค้า</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">จำนวน: {item.quantity}</p>
                  <p className="text-error">
                    {item.price.toLocaleString()} บาท
                  </p>
                </div>
                <p className="font-semibold text-lg text-error">
                  ฿ {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
            <div className="flex justify-between p-4 mt-4 border-t">
              <span className="text-lg font-semibold">ยอดรวมทั้งหมด:</span>
              <span className="text-xl font-bold text-error">
                ฿ {calculateTotal().toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">รายละเอียดการจัดส่ง</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  placeholder="กรอกชื่อ-นามสกุล"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  ที่อยู่จัดส่ง
                </label>
                <textarea
                  placeholder="กรอกที่อยู่"
                  className="input input-bordered w-full h-24 resize-none"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="text"
                  placeholder="กรอกเบอร์โทรศัพท์"
                  className="input input-bordered w-full"
                />
              </div>
              <button type="submit" className="btn btn-error w-full text-white">
                ยืนยันการสั่งซื้อ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
