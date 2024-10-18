"use client";
import React from "react";
import { Star, ShoppingCart, LucideImageOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const ProductWrapper = ({ productData }) => {
  const { name, price, productURL, image, salePrice } = productData;
  console.log(productData);
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden relative w-full max-w-md"
    >
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
            <div className="w-[300px] h-[300px] flex justify-center items-center bg-gray-50">
              <LucideImageOff size={40} />
            </div>
          )}
          {salePrice ||
            (salePrice > 0 && (
              <span className="absolute top-5 left-4 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                Sale
              </span>
            ))}
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 truncate">{name}</h3>
          {/* {rating !== undefined && (
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-sm ml-1 text-gray-600">
                {rating?.toFixed(1)} ({reviews})
              </span>
            </div>
          )} */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-xl text-black">{price} DZD</span>
              {salePrice ||
                (salePrice > 0 && (
                  <span className="text-sm line-through text-gray-500 ml-2">
                    {price} DZD
                  </span>
                ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-700 text-white p-2 rounded-full hover:bg-black transition-colors duration-300"
            >
              <ShoppingCart size={20} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductWrapper;
