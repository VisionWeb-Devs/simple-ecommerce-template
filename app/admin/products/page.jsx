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
  product: { name, productURL, productID, price, main_image, available },
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-4 items-center">
        {main_image ? (
          <Image
            src={main_image.webContentLink}
            alt={name}
            className="object-cover"
            width={100}
            height={100}
          />
        ) : (
          <div className="w-[100px] h-[100px] flex justify-center items-center bg-gray-50">
            <LucideImageOff size={40} />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-sm sm:text-base">{name}</h3>
          {/* <p className="text-gray-600 text-xs sm:text-sm">{product.category}</p> */}
          <p className="font-bold mt-2 text-sm sm:text-base">{price}DA</p>
        </div>
      </div>
      <Link
        href={`/admin/products/addProduct?productURL=${productURL}`}
        className="text-gray-500 hover:text-gray-700"
      >
        Edit
      </Link>
    </div>
    <div>
      {/* <h4 className="font-semibold mb-2 text-sm sm:text-base">Summary</h4> */}
      {/* <p className="text-sm text-gray-600 mb-4">{product.summary}</p> */}
      <div className="flex justify-between text-sm flex-col border-[1px] mx-3 md:mx-6 px-4 font-semibold ">
        {/* <div className="flex justify-between border-b-[1px] py-2">
          <p className="font-semibold">Sales</p>
          <p className="flex items-center text-green-500">
            <ArrowUp size={16} className="mr-1" />
            {product.sales}
          </p>
        </div> */}
        <div className="flex justify-between py-2">
          <p className="font-semibold">Remaining Products</p>
          <p>12</p>
        </div>
      </div>
    </div>
  </div>
);

const ProductGrid = async () => {
  let products = [];
  const res = await getAdminProducts();
  for (const product of res) {
    const images = await getImages(product.productID);
    if (!images) {
      continue;
    }
    products.push({
      ...product,
      main_image: images.images.filter((image) =>
        image.name.includes("main_")
      )[0],
      images: images.images,
    });
  }

  return (
    <div className=" mx-auto p-4 w-full bg-gray-50 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 ">
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
        {products &&
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        {!products && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default ProductGrid;
