"use server";
import { getImages } from "@/lib/googleDriveAdmin";

export async function POST(request) {
  const { product_id } = await request.json();
  const images = await getImages(product_id);
  if (!images) {
    return Response.json(
      { message: "images not found", iamges: null },
      {
        status: 404,
      }
    );
  }
  return Response.json(
    { message: "successful", ...images },
    {
      status: 200,
    }
  );
}
