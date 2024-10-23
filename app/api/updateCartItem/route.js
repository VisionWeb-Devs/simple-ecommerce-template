import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function POST(request) {
  const { product_id, quantity, product_size, userId, product_variation } =
    await request.json();
  console.log(product_id, quantity, product_size, userId, product_variation);
  console.log(userId);
  const docRef = doc(db, "cart", userId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return Response.json({ message: "cart not found" }, { status: 404 });
  }
  const cart = docSnap.data();
  const cartItem = cart.products.find(
    (item) =>
      item.product_id === product_id &&
      item.product_size === product_size &&
      item.product_variation === product_variation
  );
  if (!cartItem) {
    return Response.json({ message: "product not found" }, { status: 404 });
  }
  if (quantity === 0) {
    cart.products = cart.products.filter((item) => {
      return (
        item.product_id !== product_id ||
        item.product_size !== product_size ||
        item.product_variation !== product_variation
      );
    });
  } else {
    cartItem.quantity = quantity;
  }
  await setDoc(docRef, cart);
  return Response.json({ message: "updateCartItem" }, { status: 200 });
}
