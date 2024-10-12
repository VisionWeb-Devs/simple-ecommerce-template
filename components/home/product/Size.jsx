"use client";
import React, { useState } from "react";

const Size = () => {
  const [selectedSize, setSelectedSize] = useState("LARGE");

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">SIZE</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`px-3 py-1 border ${
              selectedSize === size
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Size;
