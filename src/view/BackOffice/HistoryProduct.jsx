// src/pages/ProductHistory.js
import React, { useState } from "react";
import productImage from "../../asset/product1.webp";

const HistoryProduct = () => {
  const [reservationHistory, setReservationHistory] = useState([
    {
      id: 1,
      productName: "AMD Ryzen 5 5600X",
      quantity: 2,
      status: "รอชำระเงิน",
      reservationDate: "2023-11-03",
      image: productImage,
    },
    {
      id: 2,
      productName: "NVIDIA GeForce RTX 3060",
      quantity: 1,
      status: "ชำระแล้ว",
      reservationDate: "2023-10-29",
      image: productImage,
    },
    {
      id: 3,
      productName: "Corsair Vengeance RGB 16GB",
      quantity: 3,
      status: "จัดส่งแล้ว",
      reservationDate: "2023-10-25",
      image: productImage,
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setReservationHistory((prevHistory) =>
      prevHistory.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-6">ประวัติการจองสินค้า</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                รูปภาพ
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                ชื่อสินค้า
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                จำนวนที่จอง
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                สถานะการจอง
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                วันที่จอง
              </th>
              <th className="px-5 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody>
            {reservationHistory.map((reservation) => (
              <tr key={reservation.id} className="border-b border-gray-200">
                <td className="px-5 py-5 text-sm">
                  <img
                    src={reservation.image}
                    alt={reservation.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-5 py-5 text-sm">{reservation.productName}</td>
                <td className="px-5 py-5 text-sm">{reservation.quantity}</td>
                <td className="px-5 py-5 text-sm">
                  <select
                    value={reservation.status}
                    onChange={(e) =>
                      handleStatusChange(reservation.id, e.target.value)
                    }
                    className="select select-bordered select-sm w-full"
                  >
                    <option value="รอชำระเงิน">รอชำระเงิน</option>
                    <option value="ชำระแล้ว">ชำระแล้ว</option>
                    <option value="จัดส่งแล้ว">จัดส่งแล้ว</option>
                  </select>
                </td>
                <td className="px-5 py-5 text-sm">
                  {reservation.reservationDate}
                </td>
                <td className="px-5 py-5 text-sm">
                  <button className="text-gray-500 hover:text-gray-700 font-semibold">
                    ดูรายละเอียด
                  </button>
                  {reservation.status === "รอชำระเงิน" && (
                    <button className="text-red-500 hover:text-red-700 font-semibold ml-4">
                      ยกเลิกการจอง
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryProduct;
