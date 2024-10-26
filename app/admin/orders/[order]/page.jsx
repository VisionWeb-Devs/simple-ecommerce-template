"use client";
import React, { useEffect } from "react";
import { Home, UserRound, ShoppingBag, Truck } from "lucide-react";
const orderData = {
  orderId: "#1",
  customer: {
    name: "Drake OVO",
    email: "drakessnake@gmail.com",
    phone: "+213 123456789",
  },
  orderInfo: {
    shipping: "AliExpress",
    paymentMethod: "Payment a livraison",
    status: "Pending",
  },
  address: "Beni Aziz Setif",
  DeliveryPrice: 900,
  discount: 0,
  products: [
    { name: "1", orderId: "#25421", quantity: 2, total: 5400 },
    { name: "2", orderId: "#25421", quantity: 3, total: 3600 },
    { name: "3", orderId: "#25421", quantity: 2, total: 2800 },
    { name: "4", orderId: "#25421", quantity: 6, total: 1500 },
  ],
};
const page = ({ params }) => {
  const [fetchedOrder, setFetchedOrder] = React.useState(null);
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch("/api/getOrderDetails", {
        method: "POST",
        body: JSON.stringify({ orderId: params.order }),
      });
      const data = await response.json();
      setFetchedOrder(data.order);
    };
    fetchOrder();
  }, []);
  console.log("fetched order: ", fetchedOrder);

  const subtotal = orderData.products.reduce(
    (sum, product) => sum + product.total,
    0
  );
  const PriceAfterAddingDelivery = subtotal + Number(orderData.DeliveryPrice);
  const discount = orderData.discount * PriceAfterAddingDelivery;
  const total = subtotal + Number(orderData.DeliveryPrice) - discount;
  return (
    <div className="bg-gray-100 p-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Orders Details</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Home &gt; Order Details
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Orders ID: {orderData.orderId}
          </h1>
          <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
            {orderData.orderInfo.status}
          </span>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600">{orderData.dateRange}</span>
          <div>
            <select className="mr-2 p-2 border rounded">
              <option value="Processing">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
              <option value="Returned">Returned</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="border rounded p-4 flex flex-col">
            <div className="flex">
              <div className="p-3 flex items-center h-full">
                <UserRound size={40} />
              </div>
              <div className="w-full">
                <h2 className="font-semibold mb-2">Customer</h2>
                <p>{orderData.customer.name}</p>
                <p>{orderData.customer.email}</p>
                <p>{orderData.customer.phone}</p>
              </div>
            </div>
          </div>
          <div className="border rounded p-4">
            <div className="flex">
              <div className="p-3 flex items-center">
                <ShoppingBag size={40} />
              </div>
              <div className="w-full">
                <h2 className="font-semibold mb-2">Order Info</h2>
                <p>Shipping: {orderData.orderInfo.shipping}</p>
                <p>Payment Method: {orderData.orderInfo.paymentMethod}</p>
                <p>Status: {orderData.orderInfo.status}</p>
              </div>
            </div>
          </div>
          <div className="border rounded p-4 ">
            <div className="flex  h-full">
              <div className="p-3 flex items-center">
                <Truck size={40} />
              </div>
              <div className="w-full">
                <h2 className="font-semibold mb-2">Deliver to</h2>
                <p>{orderData.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-4">Products</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Product Name</th>
                <th className="p-2 text-left">Product URL</th>
                <th className="p-2 text-left">Variation</th>
                <th className="p-2 text-left">Size</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.products.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.orderId}</td>
                  <td className="p-2">{product.variation}</td>
                  <td className="p-2">{product.size}</td>
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">{product.total.toFixed(2)}DA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)}DA</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>DeliveryPrice </span>
              <span>{orderData.DeliveryPrice.toFixed(2)}DA</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>{discount.toFixed(2)}DA</span>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{total.toFixed(2)}DA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
