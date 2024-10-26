import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import hero_image from "@/assets/heroimage.png";

const Hero = () => {
  return (
    <div className="relative w-full h-[700px]">
      <div className="absolute inset-0">
        <Image
          src={hero_image}
          alt="hero"
          width={1920}
          height={1080}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight">
          Shop the Latest
          <span className="block text-blue-400">Fashion Trends</span>
        </h1>

        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl text-blue-100">
          Explore our collection of contemporary styles!
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/collections"
            className="group bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            Shop Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
