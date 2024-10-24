import React from "react";

import Link from "next/link";
import { getTopSelling } from "@/lib/firebase";
import ProductCard from "./product/ProductCard";
import { getImages } from "@/lib/googleDriveAdmin";

export const TopSelling = async () => {
  const products = await getTopSelling();
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto lg:px-28 md:px-14 px-9">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Top Selling Items
          </h2>
          <Link
            href="/collections"
            className="text-gray-700 text-lg hover:text-black transition-colors duration-300"
          >
            View All Items &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(async (product) => {
            const images = await getImages(product.productID);
            const image = images.main_image?.webContentLink;
            return (
              <ProductCard
                key={product.productID}
                product={{ ...product, main_image: image }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSelling;
