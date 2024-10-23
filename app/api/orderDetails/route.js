import { getOrderDetails } from "@/lib/firebase";

export async function POST(request) {
  const { orderId } = await request.json();
  const orderDetails = await getOrderDetails(orderId);
  if (!orderDetails) {
    return Response.json({
      status: 404,
      message: "Order not found",
    });
  }
  return Response.json({
    status: 200,
    order_details: orderDetails,
  });
}
