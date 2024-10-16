import Link from "next/link";
import React from "react";
import hero_image from "../../assets/heroImage.jpg";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="relative w-full h-[700px]">
      <div className="absolute inset-0">
        <Image
          src={hero_image}
          alt="hero"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Shop the Latest Trends
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
          Explore our fashion collection!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={"/collections"}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
