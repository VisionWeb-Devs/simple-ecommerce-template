import React from "react";
import { getImages } from "@/lib/googleDriveAdmin";
import ProductWrapper from "./ProductWrapper";

const ProductCard = async ({
  name,
  price,
  productID,
  productURL,
  salePrice,
}) => {
  const images = await getImages(productID);
  const image = images.main_image?.webContentLink;

  const productData = {
    name,
    price,
    productURL,
    image,
    salePrice,
  };

  return <ProductWrapper productData={productData} />;
};

export default ProductCard;
