"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const CartItem = ({ product, quantity, onQuantityChange, onRemove }) => (
  <div className="flex flex-col sm:flex-row items-center py-4 border-b">
    <img
      src={product.image}
      alt={product.name}
      className="w-full sm:w-20 h-[500px] sm:h-20 object-cover mb-4 sm:mb-0 sm:mr-4"
    />
    <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600">DA {product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500">Size: {product.size}</p>
    </div>
    <div className="flex items-center border mb-4 sm:mb-0">
      <button
        onClick={() => onQuantityChange(quantity - 1)}
        className="px-2 py-1 rounded text-2xl"
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="w-12 text-center mx-2 rounded"
      />
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="px-2 py-1 rounded text-2xl"
      >
        +
      </button>
    </div>
    <div className="flex items-center justify-between w-full sm:w-auto">
      <button onClick={onRemove} className="sm:ml-4">
        <Trash2 size={20} />
      </button>
      <p className="ml-4 font-semibold">
        DA {(product.price * quantity).toFixed(2)}
      </p>
    </div>
  </div>
);

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Charcoal SHARK hoodie- Pink",
      price: 9500.0,
      size: "XS",
      image:
        "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p60_i1_w3464.webp?v=1719346600&width=300",
      quantity: 1,
    },
    {
      id: 2,
      name: "Charcoal SHARK hoodie- Black",
      price: 8800.0,
      size: "S",
      image:
        "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p59_i1_w3464.webp?v=1719345950&width=300",
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-0">
          Your cart
        </h2>
        <Link
          href="/"
          className="text-black hover:underline hover:underline-offset-2"
        >
          Continue shopping
        </Link>
      </div>
      <div className="mb-4">
        <div className="hidden sm:flex justify-between text-sm text-gray-600 mb-2">
          <span>PRODUCT</span>
          <div className="flex gap-32">
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>
        </div>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            product={item}
            quantity={item.quantity}
            onQuantityChange={(newQuantity) =>
              handleQuantityChange(item.id, newQuantity)
            }
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
      </div>
      <div className="text-right space-y-5">
        <p className="font-semibold">
          Estimated total: DA {total.toFixed(2)} DZD
        </p>
        <button>
          <Link
            href="/checkouts/checkout"
            className="bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors"
          >
            Proceed to checkout
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
