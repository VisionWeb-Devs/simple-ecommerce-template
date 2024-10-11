import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const categories = [
  {
    name: "Shorts",
    image:
      "https://sitoclothings.shop/cdn/shop/collections/IMG_1531.jpg?v=1720159438&width=535",
    link: "collections/shorts",
  },
  {
    name: "ZIP UP HOODIES!",
    image:
      "https://sitoclothings.shop/cdn/shop/collections/IMG_4308.jpg?v=1720159246&width=535",
    link: "collections/zip-up-hoodies",
  },
  {
    name: "Pullover Hoodies",
    image:
      "https://sitoclothings.shop/cdn/shop/collections/IMG_2682-removebg-preview_3.png?v=1720159210",
    link: "collections/pullover-hoodies",
  },
  {
    name: "Pants",
    image:
      "https://sitoclothings.shop/cdn/shop/collections/s243461973942501215_c4_i1_w2775.jpg?v=1720159098&width=535",
    link: "collections/pants",
  },
];

const CategoryCard = ({ category }) => (
  <Link href={category.link}>
    <div className="group cursor-pointer p-4 ">
      <div className="relative overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-2 flex items-center">
        <span className="text-lg font-semibold">{category.name}</span>
        <ArrowRight />
      </div>
    </div>
  </Link>
);

export const Categories = () => {
  return (
    <div className="container mx-auto lg:px-28 md:px-14 px-9 py-8">
      <h2 className="text-3xl font-bold  mb-8 pl-10">
        That&apos;s not all, SHOP MORE BELOW
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};
