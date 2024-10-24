import { getLatestProducts } from "@/lib/firebase";

export async function GET() {
  const products = await getLatestProducts();
  return Response.json({
    status: 200,
    body: products,
  });
}
