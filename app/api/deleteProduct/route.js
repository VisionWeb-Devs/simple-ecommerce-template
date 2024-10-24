import { delete_product } from "@/lib/googleDriveAdmin";

export async function POST(request) {
  const { productID } = await request.json();
  if (!productID)
    return Response.json({ status: 400, message: "Product ID not found." });
  const res = await delete_product(productID);

  return Response.json(res);
}
