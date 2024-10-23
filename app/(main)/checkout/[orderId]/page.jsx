"use client";
import React, { useEffect, useState } from "react";

const OrderConfirmationPage = ({ params }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const res = await fetch("/api/orderDetails", {
        method: "POST",
        body: JSON.stringify({ orderId: params.orderId }),
      }).then((res) => res.json());
      if (res.status === 200) {
        setOrderDetails(res.order_details);
      }
      if (res.status === 404) {
        setError(res.message);
      }
    };
    fetchOrderDetails();
  }, []);
  if (error) return <div>{error}</div>;
  if (orderDetails.length === 0) return <div>Loading...</div>;
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
              <p>{orderDetails.order_id}</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p>{new Date(orderDetails.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Total:</p>
              <p>{orderDetails.order_total} DZD</p>
            </div>
            <div>
              <p className="font-semibold">Payment method:</p>
              <p>{orderDetails.payment_method}</p>
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
            {orderDetails.order_items?.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">
                  {product.product_name} x {product.quantity}
                  <br />
                  <span className="text-sm text-gray-600">
                    Size: {product.size}
                  </span>
                </td>
                <td className="text-right py-2">{product.total} DZD</td>
              </tr>
            ))}
            <tr className="border-b">
              <td className="py-2">Subtotal:</td>
              <td className="text-right py-2">
                {orderDetails.order_subtotal} DZD
              </td>
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
              <td className="text-right py-2">{orderDetails.payment_method}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-bold">Total:</td>
              <td className="text-right py-2 font-bold">
                {orderDetails.order_total} DZD
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-lg">
        <p>
          <span className="font-semibold">Address:</span> {orderDetails.street}
        </p>
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {`${orderDetails.firstname} ${orderDetails.lastname}`}
        </p>
        <p>
          <span className="font-semibold">Phone:</span>{" "}
          {orderDetails.phone_number}
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
