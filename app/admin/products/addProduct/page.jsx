"use client";
import React, { useState, useEffect } from "react";
import { getImages } from "@/lib/googleDriveAdmin";
import { nanoid } from "nanoid";
import { useSearchParams } from "next/navigation";
import AddProductFrom from "@/components/admin/addProduct/AddProductFrom";
import AddProductImagesFrom from "@/components/admin/addProduct/AddProductImagesFrom";

const product_types = [
  {
    name: "Shirts",
    choices: [
      { value: "XS", label: "XS" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
      { value: "XL", label: "XL" },
    ],
  },
  {
    name: "Pants",
    choices: [
      { value: "28", label: "28" },
      { value: "30", label: "30" },
      { value: "32", label: "32" },
      { value: "34", label: "34" },
      { value: "36", label: "36" },
    ],
  },
];

const Page = () => {
  const productURL = useSearchParams().get("productURL");
  const [productData, setProductData] = useState({
    productID: nanoid(),
    productName: "",
    description: "",
    productURL: "",
    price: 0.0,
    salePrice: 0.0,
    available: false,
    variations: [
      {
        variationName: "",
        productType: product_types[0].name,
        sizes: [{ size: "", quantity: "" }],
      },
    ],
  });

  useEffect(() => {
    if (productURL) {
      fetch("/api/productData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productURL: productURL }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.product) {
            setProductData((prev) => ({
              ...prev,
              productID: data.product.productID,
              productName: data.product.name,
              description: data.product.description,
              price: data.product.price,
              salePrice: data.product.salePrice,
              productURL: data.product.productURL,
              available: data.product.available,
              variations: data.product.variations,
            }));

            getImages(data.product.productID).then((res) => {
              if (res.images.length === 0) return;
              setImages(
                res.images.map((image) => ({
                  file: image,
                  status: "image uploaded",
                }))
              );
            });
          } else {
            alert(data.message);
          }
        });
    }
  }, [productURL]);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 font-semibold mb-6">
        <h1 className="text-2xl md:text-3xl">Add new Product</h1>
        <p className="text-sm md:text-base">
          Admin {">"} All products {">"} Add new product
        </p>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-8 flex-grow h-full min-h-screen ">
        <div className="w-full lg:w-1/2 flex-grow h-full">
          <AddProductFrom
            productData={productData}
            setProductData={setProductData}
            product_types={product_types}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
        <div className="w-full lg:w-1/2 h-full flex-grow">
          <AddProductImagesFrom
            images={images}
            setImages={setImages}
            productData={{
              productID: productData.productID,
              variations: productData.variations,
            }}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
