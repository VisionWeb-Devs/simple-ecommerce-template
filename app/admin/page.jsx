import React from "react";
import { Calendar, User, CreditCard, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Overview } from "@/components/admin/Overview";
import { RecentSales } from "@/components/admin/RecentSales";

const dashboardData = {
  metrics: [
    {
      title: "Total Revenue",
      value: "45,231.89 DZD",
      change: "+20.1% from last month",
      icon: CreditCard,
    },
    {
      title: "Orders",
      value: "+2350",
      change: "+180.1% from last month",
      icon: User,
    },
    {
      title: "Sales",
      value: "+12,234",
      change: "+19% from last month",
      icon: CreditCard,
    },
    {
      title: "Active Now",
      value: "+573",
      change: "+201 since last hour",
      icon: Activity,
    },
  ],
};

const MetricCard = ({ title, value, change, icon: Icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Icon className="w-9 h-w-9 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-blue-400 font-semibold tracking-wide">
          {change}
        </p>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dashboardData.metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <Overview />
          <RecentSales />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
