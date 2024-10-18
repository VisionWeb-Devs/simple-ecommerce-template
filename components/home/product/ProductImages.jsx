"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductImages({ images, productName }) {
  const [currentImage, setCurrentImage] = useState(images.main_image);
  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div className="md:w-1/2 justify-center items-center flex flex-col">
      <div className="w-full justify-center items-center flex mb-4">
        {currentImage && (
          <Image
            src={currentImage.webContentLink}
            alt={productName}
            width={600}
            height={600}
            className="w-[60%] h-[710px] object-cover"
            priority
          />
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto w-full justify-center items-center">
        {images.images &&
          images.images.map((image, index) => (
            <Image
              key={image.id}
              src={image.webContentLink}
              alt={`${productName} - Image ${index + 1}`}
              width={100}
              height={100}
              className="w-[100px] h-[100px] flex-shrink-0 object-cover cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          ))}
      </div>
    </div>
  );
}
