import React, { useState, useEffect } from "react";
import axios from "axios";
import banner from "../asset/banner1.webp";
import { useNavigate } from "react-router-dom";
import { CubeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/10"
        );
        const productsData = Array.isArray(response.data.data)
          ? response.data.data
          : []; // ตรวจสอบว่าเป็น array

        const mappedData = productsData.map((item) => ({
          ...item,
          isEditing: false,
          image: item.images[0].url || "https://placehold.jp/200x200.png",
        }));

        setProducts(mappedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/category/");
        const categoriesData = Array.isArray(response.data.data)
          ? response.data.data
          : []; // ใช้ Array.isArray เพื่อตรวจสอบ
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, products.length - 6)
        : Math.max(0, prevIndex - 1)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - 6 ? 0 : prevIndex + 1
    );
  };

  const handleClickProduct = (product) => {
    console.log("Product clicked:", product);
  };

  const handleClickCategory = async (category) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/search/filters",
        {
          category: [category.id],
        }
      );
      navigate("/category", {
        state: { data: response.data, category: category.name },
      });
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div>
        <img src={banner} className="rounded-xl w-full" alt="Banner" />
      </div>
      <div className="py-4">
        <div className="flex items-center gap-2">
          <CubeIcon className="w-6 h-6 text-red-500" />
          <p className="text-lg font-semibold">หมวดหมู่สินค้า</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className="px-4 py-2 bg-white rounded-full shadow-md"
              onClick={() => handleClickCategory(category)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="relative py-4">
          <div className="flex items-center gap-2 py-4">
            <ShoppingCartIcon className="w-6 h-6 text-red-500" />
            <p className="text-lg font-semibold">สินค้าใหม่</p>
          </div>

          <div className="relative">
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
            >
              ←
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
            >
              →
            </button>

            <div className="overflow-hidden mx-8">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / 6)}%)`,
                }}
              >
                {products.map((product) => (
                  <div key={product.id} className="min-w-[16.666%] px-3">
                    <div className="bg-white shadow-xl rounded-lg p-4 cursor-pointer hover:shadow-lg hover:scale-105 transition duration-200 ease-in-out">
                      <figure className="mb-4">
                        <img
                          src={
                            product.image || "https://placehold.jp/200x200.png"
                          }
                          className="rounded-lg w-[200px]"
                        />
                      </figure>
                      <div>
                        <p className="font-semibold text-lg mb-2">
                          {product.title}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {product.description}
                        </p>
                        <p className="text-lg font-bold text-gray-800">{`฿${product.price}`}</p>
                      </div>
                      <div onClick={() => handleClickProduct(product)}>
                        <div className="btn btn-error btn-sm text-white">
                          <p className="text-[10px]">เพิ่มสินค้าลงในตะกร้า</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
