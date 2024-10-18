"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Tshirt1",
    price: "DA 1220 DZD",
    originalPrice: "",
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p71_i1_w2827.webp?v=1719344198&width=713",
    rating: 4,
    reviews: 3,
    sale: false,
  },
  {
    id: 2,
    name: "Tshirt2",
    price: "DA 1000 DZD",
    originalPrice: "DA 1420 DZD",
    image:
      "https://sitoclothings.shop/cdn/shop/files/ED8B0337-3F15-41FE-8820-E6119DD5A45E.png?v=1727900741&width=713",
    rating: 3,
    reviews: 0,
    sale: true,
  },
  {
    id: 3,
    name: "Tshirt3",
    price: "DA 900 DZD",
    originalPrice: "",
    image:
      "https://sitoclothings.shop/cdn/shop/files/A35AFFED-FA27-4801-8353-406AF3713ED8.png?v=1727899130&width=713",
    rating: 0,
    reviews: 0,
    sale: false,
  },
  {
    id: 4,
    name: "Tshirt4",
    price: "DA 1200 DZD",
    originalPrice: "DA 1540 DZD",
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p72_i1_w3464.webp?v=1719344820&width=713",
    rating: 3,
    reviews: 1,
    sale: true,
  },
  {
    id: 5,
    name: "Tshirt5",
    price: "DA 800 DZD",
    originalPrice: "DA 1170 DZD",
    image:
      "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p59_i1_w3464.webp?v=1719345950&width=713",
    rating: 5,
    reviews: 1,
    sale: true,
  },
];

const ProductCard = ({ product }) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    <Link href={`/products/${product.name}`}>
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[300px] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
        {product.sale && (
          <span className="absolute top-2 left-2  bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
            Sale
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">Category 1</p>
        <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
        <div className="flex items-center mb-2">
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
            <span className="text-sm ml-1 text-gray-600">
              ({product.reviews})
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-lg">{product.price}</span>
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

export const Collection = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop();
  const formattedSegment = lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{formattedSegment}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
