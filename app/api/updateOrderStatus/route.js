import { updateOrderSatus } from "@/lib/firebase";

export async function POST(request) {
  const { orderId, status } = await request.json();

  const response = await updateOrderSatus(orderId, status);
  return Response.json({
    success: response,
  });
}
