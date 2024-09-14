"use client";
import { Activity, ArchiveX, Package, PackageCheck } from "lucide-react";
import React, { useState } from "react";

const Dashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const statsData = [
    {
      title: "Total Orders",
      value: "500",
      percentage: 20,
      icon: <Package className="w-6 h-6  " />,
    },
    {
      title: "Active Orders",
      value: "120",
      percentage: 15,

      icon: <Activity className="w-6 h-6  " />,
    },

    {
      title: "Completed Orders",
      value: "300",
      percentage: 10,
      icon: <PackageCheck className="w-6 h-6  " />,
    },
    {
      title: "Return Orders",
      value: "$12,500",
      percentage: 25,
      icon: <ArchiveX className="w-6 h-6  " />,
    },
  ];

  const StatsCard = ({ title, value, percentage, icon }) => (
    <div className="p-4 bg-white shadow flex  flex-col ">
      <div>
        <p className="text-gray-600 font-medium">{title}</p>
      </div>
      <div className="flex">
        <div className="flex px-3 justify-center items-center border-[1px] bg-gray-50 mr-3">
          {icon}
        </div>
        <div>
          <p className="text-xl font-semibold">{value}</p>
          <p className="text-green-500 text-sm">
            ↑ {percentage}% compared to Oct 2023
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Home &gt; Dashboard
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statsData.map((stat, idx) => (
          <StatsCard
            key={idx}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 p-4 bg-white shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl">Sale Graph</h2>
            <div className="flex space-x-2">
              {["Weekly", "Monthly", "Yearly"].map((type, idx) => (
                <button
                  key={idx}
                  className="py-1 px-3 border text-gray-600 hover:bg-blue-100"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="h-40 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Graph Data Here</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow">
          <h2 className="font-bold mb-4">Best Sellers</h2>
          {["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <img
                  className="w-12 h-12 object-cover"
                  src="https://uptownoire.com/wp-content/uploads/2024/09/img_9558.jpeg"
                  alt=""
                />
                <div>
                  <p className="font-semibold">{item}</p>
                  <p className="text-gray-500">126.50DA</p>
                </div>
              </div>
              <p className="font-bold">999 sales</p>
            </div>
          ))}
          <button className="py-2 px-4 bg-blue-500 text-white">Report</button>
        </div>
      </div>

      <div className="bg-white shadow p-4">
        <h2 className="font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                {[
                  "Product",
                  "Order ID",
                  "Date",
                  "Customer Name",
                  "Status",
                  "Amount",
                ].map((heading, idx) => (
                  <th key={idx} className="py-2 px-4 border-b font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  product: "Lorem Ipsum",
                  id: "#25426",
                  date: "Nov 8th,2023",
                  customer: "Kavin",
                  status: "Delivered",
                  amount: "200.00DA",
                },
                {
                  product: "Lorem Ipsum",
                  id: "#25425",
                  date: "Nov 7th,2023",
                  customer: "Komal",
                  status: "Canceled",
                  amount: "200.00DA",
                },
                {
                  product: "Lorem Ipsum",
                  id: "#25424",
                  date: "Nov 6th,2023",
                  customer: "Nikhil",
                  status: "Delivered",
                  amount: "200.00DA",
                },
                {
                  product: "Lorem Ipsum",
                  id: "#25423",
                  date: "Nov 5th,2023",
                  customer: "Shivam",
                  status: "Canceled",
                  amount: "200.00DA",
                },
                {
                  product: "Lorem Ipsum",
                  id: "#25422",
                  date: "Nov 4th,2023",
                  customer: "Shadab",
                  status: "Delivered",
                  amount: "200.00DA",
                },
                {
                  product: "Lorem Ipsum",
                  id: "#25421",
                  date: "Nov 2nd,2023",
                  customer: "Yogesh",
                  status: "Delivered",
                  amount: "200.00DA",
                },
              ].map((order, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-4 border-b">{order.product}</td>
                  <td className="py-2 px-4 border-b">{order.id}</td>
                  <td className="py-2 px-4 border-b">{order.date}</td>
                  <td className="py-2 px-4 border-b">{order.customer}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 text-sm ${
                        order.status === "Delivered"
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
