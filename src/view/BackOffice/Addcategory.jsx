import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setName("");
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/category/");
      setCategories(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      Swal.fire("กรุณากรอกชื่อหมวดหมู่", "", "warning");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/category/", {
        name,
      });
      if (response.status === 201) {
        setCategories([...categories, response.data.data]);
        closeModal();
        Swal.fire("สำเร็จ", "เพิ่มหมวดหมู่สำเร็จ", "success");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      Swal.fire("เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่", "", "error");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8000/api/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((category) => category.id !== id));
      Swal.fire("สำเร็จ", "ลบหมวดหมู่เรียบร้อย", "success");
    } catch (error) {
      console.error("Error deleting category:", error);
      Swal.fire("เกิดข้อผิดพลาดในการลบหมวดหมู่", "", "error");
    }
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-6">เพิ่มหมวดหมู่สินค้า</p>
      <button onClick={openModal} className="btn btn-error text-white w-1/4">
        เพิ่มหมวดหมู่
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">เพิ่มหมวดหมู่สินค้า</h3>
            <form onSubmit={handleSubmit}>
              <label className="block text-gray-700 font-medium mb-2">
                ชื่อหมวดหมู่
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="กรอกชื่อหมวดหมู่"
                className="input input-bordered w-full rounded-lg mb-4"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-ghost"
                >
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-error text-white">
                  ยืนยัน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p className="mt-6 text-center">กำลังโหลดข้อมูล...</p>
      ) : categories.length > 0 ? (
        <div className="mt-6">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 p-2">ชื่อหมวดหมู่</th>
                <th className="border border-gray-200 p-2">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="border border-gray-200 p-2">
                    {category.name}
                  </td>
                  <td className="border border-gray-200 p-2 text-center">
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-500">ไม่มีข้อมูล</p>
      )}
    </div>
  );
};

export default AddCategory;
