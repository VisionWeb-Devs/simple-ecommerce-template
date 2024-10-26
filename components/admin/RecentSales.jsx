"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const salesData = {
  monthlySales: 265,
  recentSales: [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+ 1,999.00 DZD",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "+39.00 DZD ",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+299.00DZD",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      amount: "+ 99.00 DZD",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "+ 39.00 DZD",
    },
  ],
};

export function RecentSales() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>
          <p className="text-xl ">Recent Sales</p>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          You made {salesData.monthlySales} sales this month.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {salesData.recentSales.map((sale, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium">{sale.name}</p>
                  <p className="text-xs text-muted-foreground">{sale.email}</p>
                </div>
              </div>
              <div className="text-sm font-medium">{sale.amount}</div>
            </div>
          ))}
        </div>
        <div className="pt-4 flex justify-end ">
          <Link href={"/admin/orders"}>
            <Button className="w-28">View All</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
