import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import shirts from "@/assets/shirts.png";
import hoodies from "@/assets/hoodies.png";
import jeans from "@/assets/baggyjeans.png";

const collections = [
  {
    name: "Shirts",
    image: shirts.src,
    link: "collections/shirts",
  },
  {
    name: "HOODIES!",
    image: hoodies.src,
    link: "collections/hoodies",
  },

  {
    name: "Pants",
    image: jeans.src,
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

export const Collections = () => {
  return (
    <div className="container mx-auto lg:px-28 md:px-14 px-9 py-8">
      <h2 className="text-4xl font-semibold  mb-8 pl-10">Colections : </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};
