"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";

const Quantity = () => {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="flex items-center">
      <button onClick={() => handleQuantityChange(-1)} className="p-2 border">
        <MinusIcon size={16} />
      </button>
      <input
        type="text "
        value={quantity}
        onChange={(e) =>
          setQuantity(Math.max(1, parseInt(e.target.value) || 1))
        }
        className="w-16 text-center border-t border-b"
      />
      <button onClick={() => handleQuantityChange(1)} className="p-2 border">
        <PlusIcon size={16} />
      </button>
    </div>
  );
};

export default Quantity;
