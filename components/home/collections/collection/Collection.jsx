import React from "react";
import { getCategoriesProducts } from "@/lib/firebase";
import ProductCard from "../../ProductCard";

export const Collection = async (collectionName) => {
  const products = await getCategoriesProducts();
  const category = collectionName.category;
  return (
    <div className="bg-gray-100 py-16 flex-grow">
      <div className="container mx-auto lg:px-28 md:px-14 px-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
