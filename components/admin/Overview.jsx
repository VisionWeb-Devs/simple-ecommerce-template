"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 4500 },
  { month: "Mar", value: 5500 },
  { month: "Apr", value: 4300 },
  { month: "May", value: 5200 },
  { month: "Jun", value: 4800 },
  { month: "Jul", value: 3000 },
  { month: "Aug", value: 4700 },
  { month: "Sep", value: 1300 },
  { month: "Oct", value: 5300 },
  { month: "Nov", value: 5500 },
  { month: "Dec", value: 5600 },
];

export function Overview() {
  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-sm text-muted-foreground"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-sm text-muted-foreground"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
