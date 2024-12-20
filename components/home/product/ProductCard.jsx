"use client";
import { ArrowRight, LucideImageOff } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden relative"
    >
      <Link href={`/products/${product.productURL}`}>
        <div className="relative">
          {product.main_image ? (
            <Image
              src={product.main_image}
              alt={product.name}
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
          {product.sale && (
            <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 uppercase">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold md:text-2xl text-xl text-black">
                {product.salePrice > 0 ? product.salePrice : product.price} DZD
              </span>
              {(product.salePrice || product.salePrice > 0) && (
                <span className="text-lg line-through text-gray-500 ml-2">
                  {product.price} DZD
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-700 text-white p-2 rounded-full hover:bg-black transition-colors duration-300"
            >
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default ProductCard;
