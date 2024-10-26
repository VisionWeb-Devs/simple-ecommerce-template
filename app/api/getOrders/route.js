import { getOrders } from "@/lib/firebase";

export async function POST(request) {
  const { lastOrder, pageSize } = await request.json();

  const orders = await getOrders(lastOrder, pageSize);
  if (!orders)
    return Response.json({
      status: 200,
      orders: [],
    });
  return Response.json({
    status: 200,
    orders: orders,
  });
}
