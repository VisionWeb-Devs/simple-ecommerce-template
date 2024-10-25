import { getAdminProducts } from "@/lib/firebase";

export async function GET() {
  console.log("Im called");
  const products = await getAdminProducts();
  return Response.json({
    status: 200,
    body: products,
  });
}
