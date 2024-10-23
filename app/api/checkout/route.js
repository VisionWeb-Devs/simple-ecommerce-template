import { getCheckout } from "@/lib/firebase";
import { placeOrder } from "@/lib/googleDriveAdmin";
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
    order_id: order_id,
    products: cartItems,
    subtotal: calculateSubtotal(cartItems),
    total: calculateSubtotal(cartItems),
    address: userInfos.address,
    firstname: userInfos.firstName,
    lastname: userInfos.lastName,
    phone_number: userInfos.phoneNumber,
    email: userInfos.email,
    wilaya: userInfos.wilaya,
    postal_code: userInfos.postalCode,
    date: new Date(),
  };

  await placeOrder(orderDetails);

  return Response.json({
    status: 200,
    order_id: order_id,
    body: { orderDetails },
  });
}
