import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { data, category } = location.state || {};

  useEffect(() => {
    const productData = data?.data || [];

    const mappedData = productData.map((item) => ({
      ...item,
      isEditing: false,
      image: item.images?.[0]?.url || "https://placehold.jp/200x200.png",
    }));

    setProducts(mappedData);
  }, [data]);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">
        หมวดหมู่: {category || "ไม่มีข้อมูล"}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={product.image}
                  className="w-full"
                  alt={product.title}
                />
              </figure>
              <div className="card-body">
                <p className="text-lg">{product.title}</p>
                <p>{product.description}</p>
                <p className="text-sm font-bold text-gray-800">{`฿${product.price}`}</p>
                <div className="btn btn-error btn-sm text-white">
                  <p className="text-[10px]">เพิ่มสินค้าลงในตะกร้า</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">ไม่มีสินค้าในหมวดหมู่นี้</p>
      )}
    </div>
  );
};

export default Category;
