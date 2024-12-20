"use client";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { getCartItems } from "@/lib/googleDriveAdmin";
import { getUserCookie } from "@/lib/actions";
import Image from "next/image";

const CartItem = ({
  productURL,
  quantity,
  size,
  main_image,
  product_id,
  price,
  name,
  onQuantityChange,
  onRemove,
  product_variation,
  disabled,
}) => {
  if (!product_id) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b">
      {main_image && (
        <Image
          src={main_image.webContentLink}
          height={500}
          width={500}
          alt={name}
          className="w-full sm:w-20 h-[500px] sm:h-20 object-cover mb-4 sm:mb-0 sm:mr-4"
        />
      )}
      <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
        <Link href={`/products/${productURL}`} className="font-semibold">
          {name}
        </Link>
        <p className="text-gray-600">DA {price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">Size: {size}</p>
        <p className="text-sm text-gray-500">Color: {product_variation}</p>
      </div>
      <div className="flex items-center border mb-4 sm:mb-0">
        <button
          onClick={() => {
            if (Number(quantity) - 1 === 0) return;
            onQuantityChange(Number(quantity) - 1);
          }}
          className="px-2 py-1 rounded text-2xl"
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          min="1"
          className="w-12 text-center mx-2 rounded"
        />
        <button
          onClick={() => {
            onQuantityChange(Number(quantity) + 1);
          }}
          className="px-2 py-1 rounded text-2xl"
        >
          +
        </button>
      </div>
      <div className="flex items-center justify-between w-full sm:w-auto">
        <button onClick={onRemove} className="sm:ml-4">
          <Trash2 size={20} />
        </button>
        <p className="ml-4 font-semibold">DA {(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = await getUserCookie();
      const cartItems = await getCartItems(userId);
      setCartItems(cartItems);
    };
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (id, newQuantity, product) => {
    setLoading(true);
    setError("");
    const userId = await getUserCookie();
    console.log(product);
    const res = await fetch("/api/updateCartItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product.product_id,
        quantity: newQuantity,
        product_size: product.product_size,
        userId: userId,
        product_variation: product.product_variation,
      }),
    }).then((res) => res.json());

    if (res.message !== "updateCartItem") {
      setLoading(false);
      setError(res.message);
      return;
    }

    if (newQuantity === 0) {
      const updatedCartItems = cartItems.filter(
        (item) =>
          item.product_url + item.product_size + item.product_variation !== id
      );
      setCartItems(updatedCartItems);
      setLoading(false);
      return;
    }

    const updatedCartItems = cartItems.map((item) =>
      item.product_url + item.product_size + item.product_variation === id
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCartItems);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-0">
          Your cart
        </h2>
      </div>

      {cartItems.length !== 0 && (
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
              key={
                item.product_url + item.product_size + item.product_variation
              }
              productURL={item.product_url}
              quantity={item.quantity}
              size={item.product_size}
              product_id={item.product_id}
              main_image={item.main_image}
              price={item.price}
              name={item.name}
              product_variation={item.product_variation}
              onQuantityChange={(newQuantity) =>
                handleQuantityChange(
                  item.product_url + item.product_size + item.product_variation,
                  newQuantity,
                  item
                )
              }
              onRemove={() =>
                handleQuantityChange(
                  item.product_url + item.product_size + item.product_variation,
                  0,
                  item
                )
              }
              disabled={loading}
            />
          ))}
        </div>
      )}

      {cartItems.length === 0 && <p className="text-xl">Your cart is empty</p>}

      {error && <p className="text-red-500">{error}</p>}

      <div className="text-right space-y-5 mt-5">
        {cartItems.length !== 0 && (
          <p className="font-semibold">
            Estimated total:{" "}
            {cartItems.reduce(
              (total, product) =>
                total + product.price * Number(product.quantity),
              0
            )}{" "}
            DA
          </p>
        )}
        <div className="flex justify-between">
          <button>
            <Link
              href="/"
              className="bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors"
            >
              Continue shopping
            </Link>
          </button>
          {cartItems.length !== 0 && (
            <button disabled={loading}>
              <Link
                href="/checkout"
                className="bg-main text-white py-2 px-4 hover:bg-gray-800 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Proceed to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
