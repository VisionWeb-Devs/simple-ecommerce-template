import React from "react";
import { getTopSelling } from "@/lib/firebase";
import ProductCard from "../ProductCard";

const SimilarItems = async () => {
  const products = await getTopSelling();

  return (
    <div className="mb-20 mt-7">
      <h2 className="text-2xl font-bold mb-6">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;
