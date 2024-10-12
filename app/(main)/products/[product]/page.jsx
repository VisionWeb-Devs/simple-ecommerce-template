import React from "react";
import Quantity from "@/components/home/product/Quantity";
import Size from "@/components/home/product/Size";
import SimilarItems from "@/components/home/product/SimilarItems";

export default function Page() {
  const product = [
    {
      name: "SHARK Shorts in Black",
      price: " 9000 DZD",
      salePrice: " 8200 DZD",
      onSale: true,
      image:
        "https://sitoclothings.shop/cdn/shop/files/Spider_Hoodie.jpg?v=1727900820&width=713",
    },
  ];

  const { name, price, salePrice, onSale, image } = product[0];

  return (
    <div className="w-full lg:px-40 md:px-24 px-12 p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 justify-center items-center flex">
          <img
            src={image}
            alt={name}
            className="w-[500px] h-auto justify-center items-center"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          <div className="mb-4">
            <span className="text-gray-500 line-through mr-2">{price}</span>
            <span className="text-xl font-bold">{salePrice}</span>
            {onSale && (
              <span className="ml-2 bg-black text-white px-2 py-1 text-sm">
                Sale
              </span>
            )}
          </div>

          <Size />

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Quantity</h3>
            <Quantity />
          </div>

          <button className="w-full bg-black text-white py-2 px-4 mb-4">
            Add to cart
          </button>

          <ul className="list-disc list-inside">
            <li>Cotton</li>
            <li>Breathable</li>
            <li>Check size chart</li>
            <li>All orders are FINAL. No refunds are accepted</li>
          </ul>
        </div>
      </div>
      <SimilarItems />
    </div>
  );
}
