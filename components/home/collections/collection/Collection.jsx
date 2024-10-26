"use client";
import React, { useState, useEffect } from "react";
import { getCategoriesProducts } from "@/lib/firebase";
import ProductCard from "../../ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Collection = async ({ collectionName }) => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getCategoriesProducts(collectionName);
      setProducts(allProducts);
      setDisplayedProducts(allProducts.slice(0, itemsPerPage));
    };
    fetchProducts();
  }, [collectionName]);

  const handleViewMore = async () => {
    if (loading) return;

    setLoading(true);
    const newDisplayedProducts = products.slice(
      0,
      displayedProducts.length + itemsPerPage
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    setDisplayedProducts(newDisplayedProducts);
    setLoading(false);
  };

  if (displayedProducts.length === 0) {
    return (
      <div className="flex-col h-[70vh] justify-center items-center w-full py-16 mx-auto lg:px-28 md:px-14 px-9 flex space-y-7">
        <h1 className="text-3xl font-medium">
          No Products in this category :(
        </h1>
        <div>
          <Link
            href="/"
            className="group bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            Go To The Home Page
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-16 flex-grow">
      <div className="container mx-auto lg:px-28 md:px-14 px-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
      {displayedProducts.length < products.length && (
        <div className="mt-4 flex items-center justify-center">
          <Button
            variant="default"
            size="lg"
            onClick={handleViewMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "View More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Collection;
