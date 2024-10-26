"use client";
import React, { useEffect, useState } from "react";
import provinces from "@/assets/Wilaya_Of_Algeria.json";
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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const statusConfig = {
  Delivered: {
    color: "bg-green-100 text-green-700",
    icon: "⬤",
  },
  Canceled: {
    color: "bg-orange-100 text-orange-700",
    icon: "⬤",
  },
  Pending: {
    color: "bg-blue-100 text-blue-700",
    icon: "⬤",
  },
  Processing: {
    color: "bg-yellow-100 text-yellow-700",
    icon: "⬤",
  },
  Returned: {
    color: "bg-red-100 text-red-700",
    icon: "⬤",
  },
};

const OrdersList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const lastOrder = searchParams.get("lastOrder") || null;
    const products = await fetch("/api/getOrders", {
      method: "POST",
      body: JSON.stringify({
        lastOrder: lastOrder,
        pageSize: 15,
      }),
    })
      .then((res) => res.json())
      .catch((err) => setLoading(false));
    setOrders([
      ...products.orders.map((order) => ({
        id: order.order_id,
        date: order.created_at,
        customer: order.user.firstname + " " + order.user.lastname,
        status: order.order_status,
        amount: order.order_total,
        wilaya: provinces.filter(
          (prov) => prov.code === order.user.address.wilaya
        )[0].name,
      })),
    ]);
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, [searchParams.toString()]);

  const handleGetNextPage = async () => {
    if (orders.length === 0) return;
    router.push(`/admin/orders?lastOrder=${orders[orders.length - 1].date}`);
  };

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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
                <SelectItem value="Returned">Returned</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-12">
                    <Checkbox />
                  </TableHead> */}
                  <TableHead>Wilaya</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  {/* <TableHead></TableHead> */}
                </TableRow>
              </TableHeader>

              {!loading && (
                <TableBody>
                  {orders.map((order, index) => (
                    <TableRow key={index}>
                      {/* <TableCell>
                        <Checkbox />
                      </TableCell> */}
                      <TableCell>{order.wilaya}</TableCell>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        {new Date(order.date).toLocaleString()}
                      </TableCell>
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
                        {order.amount} DZD
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <ArrowRightIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            {loading && (
              <div className="text-xl font-medium flex justify-center w-full py-10">
                Loading...
              </div>
            )}

            {!loading && orders.length === 0 && (
              <div className="text-xl font-medium flex justify-center w-full py-10">
                No Orders to display.
              </div>
            )}

            <div className="mt-4 flex items-center justify-end space-x-2">
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleGetNextPage()}
                  disabled={orders.length === 0}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrdersList;
