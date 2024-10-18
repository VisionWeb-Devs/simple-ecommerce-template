"use server";
import CartForm from "@/components/home/product/CartForm";
import Quantity from "@/components/home/product/Quantity";
import SimilarItems from "@/components/home/product/SimilarItems";
import { getUserCookie } from "@/lib/actions";
import { getAdminProduct } from "@/lib/firebase";
import { getImages } from "@/lib/googleDriveAdmin";
import Image from "next/image";

export default async function Page({ params }) {
  const product = await getAdminProduct(params.product?.toString());
  if (!product) {
    return <div>Product not found</div>;
  }
  const userId = await getUserCookie();
  const images = await getImages(product.productID);
  return (
    <div className="w-full lg:px-40 md:px-24 px-12 p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 justify-center items-center flex">
          {images && (
            <Image
              src={images.main_image?.webContentLink}
              alt={product.name}
              width={500}
              height={500}
              className="w-[500px] h-auto justify-center items-center"
            />
          )}
        </div>

        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <div className="mb-4">
            {/* <span className="text-gray-500 line-through mr-2">
              {product.price}
            </span> */}
            <span className="text-xl font-bold">{product.price}</span>
            {/* {onSale && (
              <span className="ml-2 bg-black text-white px-2 py-1 text-sm">
                Sale
              </span>
            )} */}
          </div>
          <CartForm product={product} userId={userId} />

          <ul className="list-disc list-inside">{product.description}</ul>
        </div>
      </div>
      <SimilarItems />
    </div>
  );
}
