"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(15);

  const statusConfig = {
    Delivered: {
      color: "bg-green-100 text-green-700",
      icon: "⬤",
    },
    Canceled: {
      color: "bg-orange-100 text-orange-700",
      icon: "⬤",
    },
    Processing: {
      color: "bg-blue-100 text-blue-700",
      icon: "⬤",
    },
    Returned: {
      color: "bg-red-100 text-red-700",
      icon: "⬤",
    },
  };

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders List</h1>
            <p className="text-gray-500 mt-1">
              Manage and track your order history
            </p>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Select
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Returned">Returned</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>Lorem Ipsum</TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${
                          statusConfig[order.status].color
                        } px-2 py-1`}
                      >
                        <span className="mr-1 text-xs">
                          {statusConfig[order.status].icon}
                        </span>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 flex items-center justify-end space-x-2">
              <div className="flex space-x-1">
                {[...Array(totalPages).keys()].map((number) => (
                  <Button
                    key={number + 1}
                    variant={currentPage === number + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </Button>
                ))}
                {currentPage < totalPages && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrdersList;
