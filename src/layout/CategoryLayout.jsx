import React, { useState, useEffect } from "react";
import axios from "axios"; // เพิ่มการ import axios
import { Outlet, useNavigate } from "react-router-dom";

const CategoryLayout = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/category/");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleClickCategory = async (category) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/search/filters",
        {
          category: [category.id],
        }
      );

      console.log(response);

      navigate("/category", {
        state: { data: response.data, category: category.name },
      });
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="mt-4 p-4 bg-white h-[55vh] rounded-lg">
        <button
          className="btn btn-outline mb-4 w-full"
          onClick={() => navigate("/")}
        >
          ย้อนกลับไปหน้าหลัก
        </button>

        {categories.map((category) => (
          <button
            className="btn btn-block mb-4"
            onClick={() => handleClickCategory(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="col-span-3 card m-2 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default CategoryLayout;
