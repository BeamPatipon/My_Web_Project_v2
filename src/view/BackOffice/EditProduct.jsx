import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const EditProduct = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state for initial data
  const [actionLoading, setActionLoading] = useState(false); // Loading state for actions
  const itemsPerPage = 10; // จำนวนสินค้าต่อหน้า

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/100"
        );
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        const mappedData = data.map((item) => ({
          ...item,
          isEditing: false,
          image: item.images[0]?.url || "https://placehold.jp/200x200.png",
        }));

        setHistoryItems(mappedData);
      } catch (error) {
        Swal.fire("Error", "Error fetching products.", "error");
        console.error(
          "Error fetching products:",
          error.response || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditToggle = async (item) => {
    setActionLoading(true); // เปิดการโหลดสำหรับยืนยัน
    if (item.isEditing) {
      try {
        await axios.put(`http://localhost:8000/api/product/${item.id}`, {
          quantity: item.quantity,
          price: item.price,
        });
        Swal.fire("Success", "แก้ไขข้อมูลเรียบร้อยแล้ว", "success");
      } catch (error) {
        Swal.fire("Error", "เกิดข้อผิดพลาดในการแก้ไขข้อมูล", "error");
        console.error("Error updating product:", error);
      }
    }
    setHistoryItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, isEditing: !prevItem.isEditing }
          : prevItem
      )
    );
    setActionLoading(false); // ปิดการโหลดหลังการยืนยัน
  };

  const handleInputChange = (id, field, value) => {
    setHistoryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "คุณต้องการลบสินค้านี้หรือไม่?",
      text: "หากลบแล้วจะไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      setActionLoading(true); // เปิดการโหลดสำหรับลบ
      try {
        await axios.delete(`http://localhost:8000/api/product/${id}`);
        setHistoryItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
        Swal.fire("ลบแล้ว!", "สินค้าถูกลบเรียบร้อย", "success");
      } catch (error) {
        Swal.fire("Error", "เกิดข้อผิดพลาดในการลบสินค้า", "error");
        console.error("Error deleting product:", error);
      } finally {
        setActionLoading(false); // ปิดการโหลดหลังการลบ
      }
    }
  };

  const totalPages = Math.ceil(historyItems.length / itemsPerPage);
  const currentItems = historyItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <Loading />;

  return (
    <div className="mb-6">
      <p className="text-2xl font-bold mb-6">แก้ไขรายการสินค้า</p>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {actionLoading && <Loading />}{" "}
        {/* Loading overlay while action in progress */}
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                รูปภาพ
              </th>
              <th className="px-5 py-3 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                ชื่อสินค้า
              </th>
              <th className="px-5 py-3 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                จำนวน
              </th>
              <th className="px-5 py-3 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                ราคา
              </th>
              <th className="px-5 py-3 bg-gray-100 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                การดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="text-center border-b border-gray-200"
              >
                <td className="flex px-5 py-5 text-sm justify-center">
                  <img src={item.image} className="w-16 object-cover rounded" />
                </td>
                <td className="px-5 py-5 text-sm">{item.title}</td>
                <td className="px-5 py-5 text-sm">
                  {item.isEditing ? (
                    <input
                      value={item.quantity}
                      onChange={(e) =>
                        handleInputChange(item.id, "quantity", e.target.value)
                      }
                      className="input input-bordered text-sm w-20 text-center"
                    />
                  ) : (
                    `${item.quantity} ชิ้น`
                  )}
                </td>
                <td className="px-5 py-5 text-sm">
                  {item.isEditing ? (
                    <input
                      value={item.price}
                      onChange={(e) =>
                        handleInputChange(item.id, "price", e.target.value)
                      }
                      className="input text-sm input-bordered w-24 text-center"
                    />
                  ) : (
                    `฿ ${item.price}`
                  )}
                </td>
                <td className="px-5 py-5 text-sm ">
                  <div className="flex gap-5 justify-center">
                    <button
                      className={`font-semibold ${
                        item.isEditing ? "text-blue-500" : "text-gray-500"
                      } hover:underline`}
                      onClick={() => handleEditToggle(item)}
                    >
                      {item.isEditing ? "ยืนยัน" : "แก้ไข"}
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={() => handleDelete(item.id)}
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditProduct;
