import { getAllProducts } from "@/lib/firebase";

export async function GET() {
  const products = await getAllProducts();
  if (products.length === 0)
    return Response.json({ status: 404, products: [] });
  return Response.json({
    status: 200,
    products: products,
  });
}
