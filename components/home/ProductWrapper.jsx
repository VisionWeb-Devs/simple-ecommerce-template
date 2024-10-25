"use client";
import React from "react";
import { Star, ShoppingCart, LucideImageOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ProductWrapper = ({ productData }) => {
  const { name, price, productURL, image, salePrice } = productData;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative w-full max-w-md transform transition-transform duration-300 hover:-translate-y-2">
      <Link href={`/products/${productURL}`}>
        <div className="relative bg-[#F3F3F3]">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="w-full h-80 object-cover transition-transform duration-500 ease-in-out hover:scale-105 p-3"
            />
          ) : (
            <div className="w-full h-80 flex justify-center items-center bg-gray-50 flex-col object-cover">
              <LucideImageOff size={40} />
              <h1 className="font-semibold">Images not found</h1>
            </div>
          )}
          {(salePrice || salePrice > 0) && (
            <span className="absolute top-5 left-4 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 uppercase">{name}</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-xl text-black">
                {salePrice > 0 ? salePrice : price} DZD
              </span>
              {(salePrice || salePrice > 0) && (
                <span className="text-sm line-through text-gray-500 ml-2">
                  {price} DZD
                </span>
              )}
            </div>
            <button className="bg-gray-700 text-white p-2 rounded-full hover:bg-black transition-colors duration-300 transform transition-transform hover:scale-110 active:scale-90">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductWrapper;
