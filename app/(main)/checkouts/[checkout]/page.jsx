"use client";
import React, { useState, useEffect } from "react";
import provinces from "../../../../assets/Wilaya_Of_Algeria.json";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Test1",
    price: 1250,
    size: "XL",
    quantity: 1,
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p59_i1_w3464.webp?v=1719345950&width=300",
  },
  {
    id: 2,
    name: "Test2",
    price: 1100,
    size: "M",
    quantity: 1,
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p59_i1_w3464.webp?v=1719345950&width=300",
  },
  {
    id: 3,
    name: "Test3",
    price: 1450,
    size: "L",
    quantity: 1,
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p59_i1_w3464.webp?v=1719345950&width=300",
  },
  {
    id: 4,
    name: "Test4",
    price: 1350,
    size: "XL",
    quantity: 1,
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p59_i1_w3464.webp?v=1719345950&width=300",
  },
  {
    id: 4,
    name: "Test4",
    price: 1350,
    size: "XL",
    quantity: 1,
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p59_i1_w3464.webp?v=1719345950&width=300",
  },
  {
    id: 4,
    name: "Test4",
    price: 1350,
    size: "XL",
    quantity: 1,
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p59_i1_w3464.webp?v=1719345950&width=300",
  },
  {
    id: 4,
    name: "Test4",
    price: 1350,
    size: "XL",
    quantity: 1,
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p59_i1_w3464.webp?v=1719345950&width=300",
  },
];

const calculateSubtotal = () => {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

const CheckoutPage = () => {
  const [userInfos, setUserInfos] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    wilaya: "",
    postalCode: "" || null,
    promoCode: "",
  });

  const [orderSummary, setOrderSummary] = useState({
    subtotal: calculateSubtotal(),
    shipping: 0,
    total: calculateSubtotal(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfos((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "wilaya") {
      const selectedProvince = provinces.find(
        (province) => province.code === value
      );
      const shippingCost =
        selectedProvince && selectedProvince.shipping_price
          ? selectedProvince.shipping_price
          : 0;
      setOrderSummary((prevSummary) => ({
        ...prevSummary,
        shipping: shippingCost,
        total: prevSummary.subtotal + shippingCost,
      }));
    }
  };

  useEffect(() => {
    setOrderSummary((prevSummary) => ({
      ...prevSummary,
      total: prevSummary.subtotal + prevSummary.shipping,
    }));
  }, [orderSummary.subtotal, orderSummary.shipping]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="font-bold text-2xl sm:text-3xl">CHECKOUT</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 lg:pr-8 mb-8 lg:mb-0">
          <form className="p-4 py-8 mb-4 space-y-5 bg-white rounded-lg">
            <h2 className="font-bold mb-4 text-xl">SHIPPING</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                value={userInfos.firstName}
                onChange={handleInputChange}
                placeholder="First Name *"
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                name="lastName"
                value={userInfos.lastName}
                onChange={handleInputChange}
                placeholder="Last Name *"
                className="p-2 border rounded w-full"
              />
            </div>
            <input
              type="text"
              name="email"
              value={userInfos.email}
              onChange={handleInputChange}
              placeholder="Email *"
              className="p-2 border rounded w-full mb-4"
            />
            <input
              type="text"
              name="phoneNumber"
              value={userInfos.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number *"
              className="p-2 border rounded w-full mb-4"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="address"
                value={userInfos.address}
                onChange={handleInputChange}
                placeholder="Address *"
                className="p-2 border rounded w-full"
              />
              <select
                name="wilaya"
                value={userInfos.wilaya}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
              >
                <option value="">Wilaya *</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              name="postalCode"
              value={userInfos.postalCode}
              onChange={handleInputChange}
              placeholder="Postal Code * (opt)"
              className="p-2 border rounded w-full mb-4"
            />
          </form>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg p-4 ">
            <h2 className="font-bold mb-4 text-xl">BAG SUMMARY</h2>
            <div className="max-h-96 overflow-y-auto ">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col sm:flex-row md:items-start sm:justify-center items-center  w-full mb-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-4 sm:mb-0 sm:mr-4 md:h-36 md:w-36 h-52 w-52 object-cover rounded"
                  />
                  <div className="w-full justify-center items-center md:justify-start md:items-start flex flex-col">
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.price} DZD</p>
                    <p className="text-sm text-gray-600">
                      Size: {product.size}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {product.quantity}
                    </p>
                    <div className="flex mt-2">
                      <button className="text-blue-600">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border p-4 bg-white rounded-lg mb-8">
            <h2 className="font-bold mb-4 text-xl">ORDER SUMMARY</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{orderSummary.subtotal.toFixed(2)} DZD</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping (1 item)</span>
              <span>{orderSummary.shipping.toFixed(2)} DZD</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>TOTAL</span>
              <span>{orderSummary.total.toFixed(2)} DZD</span>
            </div>
            <div className="mt-4">
              <p className="text-sm mb-2">Apply a Promo Code or Discount</p>
              <div className="flex flex-col sm:flex-row">
                <input
                  type="text"
                  name="promoCode"
                  value={userInfos.promoCode}
                  onChange={handleInputChange}
                  placeholder="Promo Code"
                  className="p-2 border rounded w-full mb-2 sm:mb-0 sm:mr-2"
                />
                <button className="bg-gray-800 text-gray-100 hover:bg-black px-4 py-2 rounded transition-all duration-500">
                  APPLY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full py-14">
        <Link
          href="checkout/1"
          className="bg-gray-800 text-gray-100 hover:bg-black text-2xl rounded transition-all duration-500 px-11 py-4"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
