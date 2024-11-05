import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false); // สถานะ loading

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/category/");
        setCategory(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !selectedCategory || !image) {
      Swal.fire("กรุณากรอกข้อมูลให้ครบถ้วน", "", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("images", image); // ส่งไฟล์ภาพ
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity.toString());
    formData.append("categoryId", selectedCategory);

    setLoading(true); // เริ่มแสดง loading

    try {
      await axios.post("http://localhost:8000/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("สำเร็จ", "เพิ่มสินค้าสำเร็จ", "success");

      // รีเซ็ตค่าในฟอร์ม
      setTitle("");
      setDescription("");
      setPrice("");
      setQuantity(1);
      setSelectedCategory("");
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      Swal.fire("เกิดข้อผิดพลาดในการเพิ่มสินค้า", "", "error");
    } finally {
      setLoading(false); // ปิด loading หลังจากทำเสร็จ
    }
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-6">เพิ่มสินค้า</p>
      {loading ? (
        <Loading /> // แสดง loading component ขณะกำลังโหลด
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              รูปภาพสินค้า
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full "
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Product"
                className="mt-4 h-32 object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ชื่อสินค้า
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="กรอกชื่อสินค้า"
              className="input input-bordered w-full rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              คำอธิบายสินค้า
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="กรอกคำอธิบายสินค้า"
              className="input input-bordered w-full rounded-lg h-24 resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">ราคา</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="กรอกราคาสินค้า"
              className="input input-bordered w-full rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              หมวดหมู่สินค้า
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full rounded-lg"
            >
              <option value="" disabled>
                เลือกหมวดหมู่สินค้า
              </option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              จำนวนสินค้า
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementQuantity}
                className="btn text-white w-16"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="input input-bordered w-32 mx-2 text-center"
              />
              <button
                type="button"
                onClick={incrementQuantity}
                className="btn btn-error text-white w-16"
              >
                +
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-error text-white w-full">
            เพิ่มสินค้า
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
