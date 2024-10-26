import { getOrderInfo } from "@/lib/firebase";

export async function POST(request) {
  const { orderId } = await request.json();
  const order = await getOrderInfo(orderId);
  if (!order) return Response.json({ status: 404, message: "Order not found" });
  return Response.json({ status: 200, order });
}
