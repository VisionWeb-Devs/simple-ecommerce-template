import React from "react";
import {
  MoreVertical,
  ArrowUp,
  CirclePlus,
  LucideImageOff,
} from "lucide-react";
import { getAdminProducts } from "@/lib/firebase";
import { getImages } from "@/lib/googleDriveAdmin";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  product: {
    name,
    productURL,
    productID,
    price,
    main_image,
    available,
    salePrice,
  },
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-4 items-center">
        {main_image ? (
          <Image
            src={main_image.webContentLink}
            alt={name}
            className="object-cover rounded-lg"
            width={100}
            height={100}
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        ) : (
          <div className="w-[100px] h-[100px] flex justify-center items-center bg-gray-50">
            <LucideImageOff size={40} />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold text-xl sm:text-2xl">{name}</h3>
          <div className="flex gap-4 sm:gap-8 mt-2">
            <p className="font-bold text-3xl sm:text-2xl">{salePrice}DA</p>
            {price && (
              <p className="font-bold text-opacity-50 text-black line-through text-xl sm:text-xl">
                {price}DA
              </p>
            )}
          </div>
        </div>
      </div>
      <Link
        href={`/admin/products/addProduct?productURL=${productURL}`}
        className="text-gray-500 hover:text-gray-700 text-lg font-semibold"
      >
        Edit
      </Link>
    </div>
    <div className="border-t pt-2 mt-2 text-sm">
      <div className="flex justify-between">
        <p className="font-semibold">Product Page:</p>
        <Link href={`../../products/${productURL}`} className="hover:underline">
          Go to Product Page
        </Link>
      </div>
    </div>
  </div>
);

const ProductGrid = async () => {
  const res = await getAdminProducts();
  const products = await Promise.all(
    res.map(async (product) => {
      const images = await getImages(product.productID);

      return {
        ...product,
        main_image: images.images.find((image) => image.name.includes("main_")),
        images: images.images,
      };
    })
  );

  return (
    <div className="mx-auto p-4 w-full bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">All Products</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Home &gt; All Products
          </p>
        </div>
        <a
          href="/admin/products/addProduct"
          className="bg-main text-white px-3 py-2 rounded text-sm sm:text-base flex justify-center items-center gap-3"
        >
          <CirclePlus />
          ADD NEW PRODUCT
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {products.length ? (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
