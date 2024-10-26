"use client";
import React, { useEffect, useState } from "react";
import { UserRound, ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import Link from "next/link";

const Page = ({ params }) => {
  const [fetchedOrder, setFetchedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const statusConfig = {
    Delivered: {
      color: "bg-green-100 text-green-700",
    },
    Canceled: {
      color: "bg-red-100 text-red-700",
    },
    Pending: {
      color: "bg-blue-100 text-blue-700",
    },
    Returned: {
      color: "bg-orange-100 text-orange-700",
    },
    Processing: {
      color: "bg-gray-100 text-gray-700",
    },
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch("/api/getOrderDetails", {
        method: "POST",
        body: JSON.stringify({ orderId: params.order }),
      });
      const data = await response.json();
      setFetchedOrder(data.order);
      setOrderStatus(data.order.order_status);
    };
    fetchOrder();
  }, [params.order]);

  const handleStatusChange = (value) => {
    setOrderStatus(value);
  };

  const handleSave = async () => {
    setLoading(true);
    const response = await fetch("/api/updateOrderStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: params.order, status: orderStatus }),
    });
    const data = await response.json();
    if (data.success) {
      setFetchedOrder((prev) => ({
        ...prev,
        order_status: orderStatus,
      }));
    }
    setLoading(false);
  };

  if (!fetchedOrder) {
    return <div>Loading...</div>;
  }

  const subtotal =
    fetchedOrder?.order_items.reduce(
      (sum, product) => sum + product.total,
      0
    ) || 0;

  const total = subtotal + Number(fetchedOrder.shipping.cost);

  return (
    <div className="bg-gray-100 p-8 md:p-10 lg:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Order Details</h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Home &gt; Order Details
        </p>

        <Card className="shadow-lg p-4 md:p-6 lg:p-8">
          <CardHeader className="flex justify-between items-center mb-4">
            <CardTitle className="text-2xl font-semibold">
              Order ID: {fetchedOrder?.order_id}
            </CardTitle>
            <div
              className={`${
                statusConfig[fetchedOrder.order_status]?.color
              } px-4 py-2 text-sm font-semibold rounded-lg`}
            >
              {fetchedOrder.order_status}
            </div>
          </CardHeader>
          <CardContent className="flex justify-between items-center mb-4">
            <span className="text-gray-600">{fetchedOrder.created_at}</span>
            <div className="flex items-center space-x-2">
              <Select onValueChange={handleStatusChange} value={orderStatus}>
                <SelectTrigger className="mr-2 p-2 border border-gray-300 rounded-md">
                  <span>{orderStatus}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                Save
              </Button>
            </div>
          </CardContent>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <Card className="p-4">
              <CardContent>
                <div className="flex items-center">
                  <UserRound size={40} className="mr-3" />
                  <div>
                    <h1 className="font-semibold mb-2">Customer</h1>
                    <p>
                      {fetchedOrder.user.firstname} {fetchedOrder.user.lastname}
                    </p>
                    <p>{fetchedOrder.user.email}</p>
                    <p>{fetchedOrder.user.phone_number}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardContent>
                <div className="flex items-center">
                  <ShoppingBag size={40} className="mr-3" />
                  <div>
                    <h2 className="font-semibold mb-2">Order Info</h2>
                    <p>Shipping: {fetchedOrder.shipping.method}</p>
                    <p>Payment Method: Cash on delivery</p>
                    <p>Status: {fetchedOrder.order_status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4">
              <CardContent>
                <div className="flex items-center">
                  <Truck size={40} className="mr-3" />
                  <div>
                    <h2 className="font-semibold mb-2">Deliver to</h2>
                    {fetchedOrder?.user.address ? (
                      <div>
                        <p>
                          Address: {fetchedOrder.user.address.street},{" "}
                          {fetchedOrder.user.address.wilaya},{" "}
                          {fetchedOrder.user.address.postal_code}
                        </p>
                        <p>Shipping Price: {fetchedOrder.shipping.cost}</p>
                        <p>Shipping Method: {fetchedOrder.shipping.method}</p>
                      </div>
                    ) : (
                      <p>No address provided</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-4">Products</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Product URL</TableHead>
                  <TableHead>Variation</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Quantity in Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fetchedOrder.order_items.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Link
                        href={`/products/${product.product_url}`}
                        target="_blank"
                      >
                        {product.product_name}
                      </Link>
                    </TableCell>
                    <TableCell>{product.product_url}</TableCell>
                    <TableCell>{product.product_variation || "N/A"}</TableCell>
                    <TableCell>{product.size || "N/A"}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.total.toFixed(2)}DA</TableCell>
                    <TableCell>5 </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end mb-4">
            <div className="w-full md:w-1/3">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}DA</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Price</span>
                <span>{fetchedOrder.shipping.cost.toFixed(2)}DA</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{total.toFixed(2)}DA</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
