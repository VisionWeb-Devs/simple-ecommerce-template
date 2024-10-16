import { getTopSelling } from "@/lib/firebase";
import { getImages } from "@/lib/googleDriveAdmin";
import { LucideImageOff } from "lucide-react";
// import { LucideImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = async ({ name, price, productID, productURL }) => {
  const images = await getImages(productID);
  const image = images.main_image?.webContentLink;
  return (
    <Link href={`/products/${productURL}`}>
      <div className=" p-4 rounded-lg">
        <div className="relative bg-[#F3F3F3]  shadow ">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={300}
              height={300}
              className="w-full h-64 object-cover mb-2 transition-transform duration-500 ease-in-out hover:scale-105 p-3"
            />
          ) : (
            <div className="w-[300px] h-[300px] flex justify-center items-center bg-gray-50">
              <LucideImageOff size={40} />
            </div>
          )}
          {/* {onSale && (
            <span className="absolute bottom-2 left-2 bg-black text-white text-md font-semibold px-2 py-1 rounded">
              Sale
            </span>
          )} */}
        </div>

        <h3 className="font-bold">{name}</h3>
        <p className="">
          {/* {salePrice ? (
          <>
            <span className="line-through mr-2 text-gray-500">
              {price + ".00"}
            </span>
            <span className="text-black font-semibold ">
              {salePrice + ".00"}
            </span>
          </>
        ) : ( */}
          {price}
          {/* )} */}
        </p>
      </div>
    </Link>
  );
};

const SimilarItems = async () => {
  const products = await getTopSelling();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarItems;
