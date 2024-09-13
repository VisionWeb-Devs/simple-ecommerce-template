import React from "react";
import { MoreVertical, ArrowUp, CirclePlus } from "lucide-react";

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center">
        <img
          src={product.main_image}
          alt={product.name}
          className="w-20 h-20 object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold text-sm sm:text-base">{product.name}</h3>
          <p className="text-gray-600 text-xs sm:text-sm">{product.category}</p>
          <p className="font-bold mt-2 text-sm sm:text-base">
            {product.price}DA
          </p>
        </div>
      </div>
      <button className="text-gray-500 hover:text-gray-700">
        <MoreVertical size={20} />
      </button>
    </div>
    <div>
      <h4 className="font-semibold mb-2 text-sm sm:text-base">Summary</h4>
      <p className="text-sm text-gray-600 mb-4">{product.summary}</p>
      <div className="flex justify-between text-sm flex-col border-[1px] mx-3 md:mx-6 px-4 font-semibold ">
        <div className="flex justify-between border-b-[1px] py-2">
          <p className="font-semibold">Sales</p>
          <p className="flex items-center text-green-500">
            <ArrowUp size={16} className="mr-1" />
            {product.sales}
          </p>
        </div>
        <div className="flex justify-between py-2">
          <p className="font-semibold">Remaining Products</p>
          <p>{product.remaining}</p>
        </div>
      </div>
    </div>
  </div>
);

const ProductGrid = () => {
  const products = [
    {
      name: "Baggy Jeans",
      category: "Battery",
      price: "6 000",
      summary: "Hello Its mee.",
      sales: 1269,
      remaining: 1269,
      main_image:
        "https://uptownoire.com/wp-content/uploads/2024/09/img_9571.jpeg",
    },
    {
      name: "Double knee baggy jeans",
      category: "Battery",
      price: "5 500",
      summary: "Hello Its mee.",
      sales: 1269,
      remaining: 1269,
      main_image:
        "https://mademe.nyc/cdn/shop/files/DoubleKnee_Jean_Black_4372.jpg?v=1695810503",
    },
    {
      name: "Baggy Jeans",
      category: "Battery",
      price: "6 000",
      summary: "Hello Its mee.",
      sales: 1269,
      remaining: 1269,
      main_image:
        "https://uptownoire.com/wp-content/uploads/2024/09/img_9571.jpeg",
    },
    {
      name: "Double knee baggy jeans",
      category: "Battery",
      price: "5 500",
      summary: "Hello Its mee.",
      sales: 1269,
      remaining: 1269,
      main_image:
        "https://mademe.nyc/cdn/shop/files/DoubleKnee_Jean_Black_4372.jpg?v=1695810503",
    },
  ];

  return (
    <div className=" mx-auto p-4 w-full bg-gray-50 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 ">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">All Products</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Home &gt; All Products
          </p>
        </div>
        <a
          href="/admin/products/addProduct"
          className="bg-main text-white px-3 py-2 rounded text-sm sm:text-base flex justify-center items-center gap-3"
        >
          <CirclePlus />
          ADD NEW PRODUCT
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
