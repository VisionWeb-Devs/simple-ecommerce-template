import Link from "next/link";
import React from "react";

const ProductCard = ({ name, price, salePrice, image, onSale }) => (
  <Link href={`/products/${name}`}>
    <div className=" p-4 rounded-lg">
      <div className="relative bg-[#F3F3F3]  shadow ">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover mb-2 transition-transform duration-500 ease-in-out hover:scale-105 p-3"
        />
        {onSale && (
          <span className="absolute bottom-2 left-2 bg-black text-white text-md font-semibold px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>

      <h3 className="font-bold">{name}</h3>
      <p className="">
        {salePrice ? (
          <>
            <span className="line-through mr-2 text-gray-500">
              {price + ".00"}
            </span>
            <span className="text-black font-semibold ">
              {salePrice + ".00"}
            </span>
          </>
        ) : (
          price
        )}
      </p>
    </div>
  </Link>
);

const SimilarItems = () => {
  const products = [
    {
      name: "Test1",
      price: " 9000 DZD",
      salePrice: " 8200 DZD",
      onSale: true,
      image:
        "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p36_i1_w800.webp?v=1719349399&width=360",
    },
    {
      name: "Test2",
      price: " 9000 DZD",
      salePrice: null,
      onSale: false,
      image:
        "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p36_i1_w800.webp?v=1719349399&width=360",
    },
    {
      name: "Test3",
      price: " 1540 DZD",
      salePrice: " 1220 DZD",
      onSale: true,
      image:
        "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p36_i1_w800.webp?v=1719349399&width=360",
    },
    {
      name: "Test5",
      price: " 1220 DZD",
      salePrice: null,
      onSale: false,
      image:
        "https://sitoclothings.shop/cdn/shop/files/s243461973942501215_p36_i1_w800.webp?v=1719349399&width=360",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;
