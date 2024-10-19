import { getCheckout } from "@/lib/firebase";
import { nanoid } from "nanoid";

const calculateSubtotal = (products) => {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

export async function POST(request) {
  const { userId, userInfos } = await request.json();
  const order_id = nanoid();
  const cartItems = await getCheckout(userId);
  const orderDetails = {
    products: cartItems,
    subtotal: calculateSubtotal(cartItems),
    shipping: userInfos.shipping,
    total: calculateSubtotal(cartItems) + userInfos.shipping,
    address: userInfos.address,
    userName: userInfos.userName,
    phoneNumber: userInfos.phoneNumber,
    paymentMethod: userInfos.paymentMethod,
  };
  return Response.json({
    status: 200,
    order_id: order_id,
    body: { orderDetails },
  });
}
