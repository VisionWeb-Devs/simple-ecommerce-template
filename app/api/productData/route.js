"use server";
import { getAdminProduct } from "@/lib/firebase";

export async function POST(request) {
  const { productURL } = await request.json();
  const product = await getAdminProduct(productURL);
  if (!product) {
    return Response.json(
      { message: "Product not found", product: null },
      {
        status: 404,
      }
    );
  }
  return Response.json(
    { message: "successful", product: product },
    {
      status: 200,
    }
  );
}
