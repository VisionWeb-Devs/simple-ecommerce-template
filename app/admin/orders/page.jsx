"use client";
import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";

const orders = [
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Returned",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Delivered",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Processing",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Processing",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Processing",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Returned",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Processing",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
  {
    id: "#25426",
    date: "Nov 8th, 2023",
    customer: "Kavin",
    status: "Processing",
    amount: "200.00DA",
  },
  {
    id: "#25425",
    date: "Nov 7th, 2023",
    customer: "Kamal",
    status: "Canceled",
    amount: "200.00DA",
  },
];

const OrdersList = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const statusColors = {
    Delivered: "text-green-500",
    Canceled: "text-orange-900",
    Processing: "text-blue-500",
    Returned: "text-red-500",
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Orders List</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Home &gt; Order List
          </p>
        </div>
        <div className="flex items-center space-x-4 flex-col space-y-5">
          <div className="flex w-full">
            <div className="w-full gap-2 flex items-center justify-center flex-col">
              <div className="flex gap-4 justify-center items-center">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-[#F9FAFB] font-semibold"
                  style={{ appearance: "none" }}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-[#F9FAFB] font-semibold"
                  style={{ appearance: "none" }}
                />
              </div>

              <div className="text-xl font-semibold">
                {startDate && endDate
                  ? `${formatDate(startDate)} - ${formatDate(endDate)}`
                  : "Please select a date range"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-4">Recent Purchases</h2>
          <div className="flex items-center justify-between mb-6">
            <select
              className="bg-gray-200 p-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
              <option value="Processing">Processing</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500">
              <th>
                <input type="checkbox" />
              </th>
              <th>Product</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td>
                  <input type="checkbox" />
                </td>
                <td>Lorem Ipsum</td>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td className="flex items-center">{order.customer}</td>
                <td>
                  <span
                    className={`${statusColors[order.status]} font-semibold`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end space-x-2">
        <button className="px-3 py-1 border  bg-gray-200">1</button>
        <button className="px-3 py-1 border ">2</button>
        <button className="px-3 py-1 border ">3</button>
        <button className="px-3 py-1 border ">4</button>
        <span>...</span>
        <button className="px-3 py-1 border ">Next</button>
      </div>
    </div>
  );
};

export default OrdersList;
