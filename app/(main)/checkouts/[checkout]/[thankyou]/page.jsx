"use client";
import React, { useEffect, useState } from "react";

const OrderConfirmationPage = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const exampleOrder = {
    orderNumber: "1",
    date: new Date().toLocaleDateString(),
    total: "4300 ",
    paymentMethod: "Cash on delivery",
    products: [
      {
        name: "Test1",
        size: "L",
        price: "4300 ",
        Quantiy: 1,
      },
    ],
    subtotal: "7565",
    shipping: {
      cost: "900 ",
      method: "via Domicile",
    },
    address: "Beni Aziz",
    userName: "vision",
    phoneNumber: "0123456789",
  };

  useEffect(() => {
    setOrderDetails(exampleOrder);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <p className="text-green-600 text-3xl">
          Thank you. Your order has been received.
        </p>
        <div className="border border-green-300 rounded-lg p-4 inline-block mt-4">
          <div className="grid grid-cols-4 gap-4 text-md">
            <div>
              <p className="font-semibold">Order number:</p>
              <p>{orderDetails.orderNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p>{orderDetails.date}</p>
            </div>
            <div>
              <p className="font-semibold">Total:</p>
              <p>{orderDetails.total} DZD</p>
            </div>
            <div>
              <p className="font-semibold">Payment method:</p>
              <p>{orderDetails.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">ORDER DETAILS</h2>
        <table className="w-full text-lg">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">PRODUCT</th>
              <th className="text-right py-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.products?.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">
                  {product.name} x {product.Quantiy}
                  <br />
                  <span className="text-sm text-gray-600">
                    Size: {product.size}
                  </span>
                </td>
                <td className="text-right py-2">{product.price} DZD</td>
              </tr>
            ))}
            <tr className="border-b">
              <td className="py-2">Subtotal:</td>
              <td className="text-right py-2">{orderDetails.subtotal} DZD</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Shipping:</td>
              <td className="text-right py-2">
                {orderDetails.shipping?.cost}
                {" DZD "}
                <span className="text-sm text-gray-600">
                  {orderDetails.shipping?.method}
                </span>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Payment method:</td>
              <td className="text-right py-2">{orderDetails.paymentMethod}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-bold">Total:</td>
              <td className="text-right py-2 font-bold">
                {orderDetails.total} DZD
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-lg">
        <p>
          <span className="font-semibold">Address:</span> {orderDetails.address}
        </p>
        <p>
          <span className="font-semibold">Name:</span> {orderDetails.userName}
        </p>
        <p>
          <span className="font-semibold">Phone:</span>{" "}
          {orderDetails.phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
