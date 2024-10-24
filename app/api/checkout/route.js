import { getCheckout } from "@/lib/firebase";
import { placeOrder } from "@/lib/googleDriveAdmin";
import { nanoid } from "nanoid";
import provinces from "@/assets/Wilaya_Of_Algeria.json";

const calculateSubtotal = (products) => {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

const createOrderStructure = (userInfos, cartItems, userId) => {
  const selectedProvince = provinces.find(
    (province) => province.code === userInfos.wilaya
  );
  const shippingCost =
    selectedProvince && selectedProvince.shipping_price
      ? selectedProvince.shipping_price
      : 0;
  return {
    order_id: `ORD-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${nanoid(5).toLocaleUpperCase()}`,
    userId: userId,
    user: {
      firstname: userInfos.firstName,
      lastname: userInfos.lastName,
      email: userInfos.email,
      phone_number: userInfos.phoneNumber,
      address: {
        street: userInfos.street,
        wilaya: userInfos.wilaya,
        postal_code: userInfos.postalCode,
      },
    },
    order_items: cartItems.map((item) => {
      return {
        product_id: item.id,
        product_url: item.product_url,
        product_name: item.name,
        quantity: item.quantity,
        product_variation: item.product_variation,
        size: item.size,
        price: item.price,
        total: item.price * Number(item.quantity),
      };
    }),
    order_subtotal: calculateSubtotal(cartItems),
    shipping: {
      method: "A domicile",
      cost: shippingCost,
    },
    order_total: calculateSubtotal(cartItems) + shippingCost,
    order_status: "Pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

export async function POST(request) {
  const { userId, userInfos } = await request.json();
  const cartItems = await getCheckout(userId);
  const orderDetails = createOrderStructure(userInfos, cartItems, userId);

  const res = await placeOrder(orderDetails);
  if (res.status === "success") {
    return Response.json({
      status: 200,
      body: { order_id: orderDetails.order_id },
    });
  }
  return Response.json({
    status: 404,
    body: { message: "Error placing your order" },
  });
}
