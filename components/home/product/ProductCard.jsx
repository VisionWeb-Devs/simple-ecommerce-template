"use client";
import { LucideImageOff, ShoppingCart } from "lucide-react";
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
          {product.sale && (
            <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-lg text-black">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-gray-500 ml-2">
                  {product.originalPrice}
                </span>
              )}
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
export default ProductCard;
