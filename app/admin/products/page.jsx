import React from "react";
import { CirclePlus, LucideImageOff, ExternalLink, Edit2 } from "lucide-react";
import { getAdminProducts } from "@/lib/firebase";
import { getImages } from "@/lib/googleDriveAdmin";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({
  product: {
    name,
    productURL,
    productID,
    price,
    main_image,
    available,
    salePrice,
  },
}) => (
  <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div className="p-4">
      <div className="relative">
        {main_image ? (
          <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
            <Image
              src={main_image.webContentLink}
              alt={name}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="h-48 w-full flex justify-center items-center bg-gray-100 rounded-lg mb-4">
            <LucideImageOff className="text-gray-400" size={48} />
          </div>
        )}

        <Link
          href={`/admin/products/addProduct?productURL=${productURL}`}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <Edit2 className="w-4 h-4 text-gray-600" />
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold text-main">
            {salePrice === 0 ? price : salePrice}DA
          </p>
          {salePrice !== 0 && (
            <p className="text-sm text-gray-500 line-through">{price}DA</p>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`../../products/${productURL}`}
            className="flex-1"
            target="_blank"
          >
            <button className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center group">
              View Page
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const ProductGrid = async () => {
  const res = await getAdminProducts();
  const products = await Promise.all(
    res.map(async (product) => {
      const images = await getImages(product.productID);
      return {
        ...product,
        main_image: images.images.find((image) => image.name.includes("main_")),
        images: images.images,
      };
    })
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Products
            </h1>
            <p className="text-gray-500 text-sm">
              Manage and organize your products
            </p>
          </div>
          <Link href="/admin/products/addProduct">
            <button className="bg-main hover:bg-main/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <CirclePlus className="h-4 w-4" />
              Add Product
            </button>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div className="h-4 w-48 bg-gray-200 rounded" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
