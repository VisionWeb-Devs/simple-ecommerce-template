"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    console.log("Current quantity:", newQuantity);
  };

  const handleInputChange = (e) => {
    const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(newQuantity);
    console.log("Current quantity:", newQuantity);
  };

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => handleQuantityChange(-1)}
          className="p-2 border"
        >
          <MinusIcon size={16} />
        </button>
        <input
          type="text"
          value={quantity}
          onChange={handleInputChange}
          className="w-16 text-center border-t border-b"
        />
        <button
          type="button"
          onClick={() => handleQuantityChange(1)}
          className="p-2 border"
        >
          <PlusIcon size={16} />
        </button>
      </div>
      <input type="hidden" name="quantity" value={quantity} />
    </>
  );
};

export default Quantity;
