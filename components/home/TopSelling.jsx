import React from "react";
import { LucideImageOff, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTopSelling } from "@/lib/firebase";
import { getImages } from "@/lib/googleDriveAdmin";

const ProductCard = async ({ product }) => {
  const images = await getImages(product.productID);

  return (
    <Link href={`products/${product.name}`}>
      <div className="bg-white p-4 rounded-lg ">
        <div className="relative bg-[#F3F3F3]  shadow ">
          {images.main_image?.webContentLink ? (
            <Image
              src={images.main_image?.webContentLink}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-[300px] object-cover mb-4 transition-transform duration-500 ease-in-out hover:scale-105"
            />
          ) : (
            /* {product.sale && (
          <span className="absolute bottom-2 left-2 bg-black text-white text-md font-bold px-2 py-1 rounded">
            Sale
          </span>
        )} */ <div className="w-[300px] h-[300px] flex justify-center items-center bg-gray-50">
              <LucideImageOff size={40} />
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        {/* <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < product.rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }
          />
        ))}
        {product.reviews > 0 && (
          <span className="text-xs ml-1">({product.reviews})</span>
        )}
      </div> */}
        <div className="flex items-center justify-between ">
          <span className="font-bold text-xl">{product.price}</span>
          {/* {product.originalPrice && (
          <span className="text-md line-through text-gray-500">
            {product.originalPrice}
          </span>
        )} */}
        </div>
      </div>
    </Link>
  );
};

export const TopSelling = async () => {
  const products = await getTopSelling();
  return (
    <div className="container mx-auto lg:px-28 md:px-14 px-9 py-8">
      <h1 className="text-3xl font-bold mb-8 pl-10 ">TOP SELLING ITEMS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
};
