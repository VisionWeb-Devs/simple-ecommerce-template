"use client";
import { useState } from "react";
import Image from "next/image";
import { LucideImageOff } from "lucide-react";

export default function ProductImages({ images, productName }) {
  const [currentImage, setCurrentImage] = useState(images.main_image);
  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div className="md:w-1/2 justify-center items-center flex flex-col">
      <div className="w-full justify-center items-center flex mb-4 ">
        {currentImage ? (
          <Image
            src={currentImage.webContentLink}
            alt={productName}
            width={1000}
            height={600}
            className="md:w-[60%] w-full h-[350px] md:h-[610px] object-cover"
            priority
          />
        ) : (
          <div className="w-[60%] h-[710px]  flex justify-center items-center bg-gray-50 flex-col object-cover">
            <LucideImageOff size={40} />
            <h1 className="font-semibold">Images not found</h1>
          </div>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto w-full justify-center items-center border-b ">
        {images.images &&
          images.images.map((image, index) => (
            <Image
              key={image.id}
              src={image.webContentLink}
              alt={`${productName} - Image ${index + 1}`}
              width={100}
              height={100}
              className="w-[100px] h-[100px] flex-shrink object-cover cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          ))}
      </div>
    </div>
  );
}
