"use client";
import Input from "@/components/admin/Input";
import React, { useRef, useState } from "react";
import {
  add_product,
  change_image_variation,
  upload_file,
} from "@/lib/googleDriveAdmin";
import { LucideX } from "lucide-react";
import Image from "next/image";
import { nanoid } from "nanoid";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const shirtsOptions = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
];
const pantsOptions = [
  { value: "28", label: "28" },
  { value: "30", label: "30" },
  { value: "32", label: "32" },
  { value: "34", label: "34" },
  { value: "36", label: "36" },
];

const Page = () => {
  const router = useRouter();
  const [productId, setProductId] = useState(nanoid());
  const [confirmProduct, setConfirmProduct] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = React.useState("");
  const [productUrl, setProductUrl] = React.useState("");
  const [selectOptions, setSelectOptions] = React.useState(shirtsOptions);
  const [variations, setVariations] = React.useState([]);
  const [productType, setProductType] = React.useState("Shirts");
  const createSlug = (productName) => {
    return productName
      .toLowerCase()
      .replace(/[\s-]+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/-+/g, "-")
      .replace(/-$/, "");
  };
  const format_variation_name = (variation_name) => {
    return variation_name
      .toLowerCase()
      .replace(/[\s-]+/g, "_")
      .replace(/[^\w_]+/g, "")
      .replace(/_+/g, "_")
      .replace(/_$/, "");
  };
  const handleImageChange = async (e) => {
    if (e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    const uniqueFiles = selectedFiles.filter(
      (file) => !images.some((prevFile) => prevFile.file.name === file.name)
    );

    setImageURL(URL.createObjectURL(e.target.files[0]));
    setImages((prevImages) => [
      ...prevImages,
      ...uniqueFiles.map((file) => ({ file, response: "Uploading" })),
    ]);
    const uploadPromise = async (files) => {
      const formData = new FormData();
      formData.set("images", JSON.stringify([]));
      formData.set("files", []);
      files.forEach((file, index) => {
        let image_name = `image_${images.length + index}`;
        const images_array = JSON.parse(formData.getAll("images"));
        images_array.push(image_name);
        formData.set("images", JSON.stringify(images_array));
        formData.append(image_name, file);
      });
      formData.append("product_url", productUrl);
      formData.append("productID", productId);

      const response = await upload_file(formData);
      return { files, response };
    };
    setImageURL(URL.createObjectURL(e.target.files[0]));
    await uploadPromise(uniqueFiles).then((uploadedFiles) => {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        uploadedFiles.files.forEach((file, index) => {
          newImages[images.length + index] = {
            file,
            response: uploadedFiles.response,
          };
        });
        return newImages;
      });
    });
  };
  const handleVariationChange = async (file, index, variation) => {
    const uploadPromises = async () => {
      const formData = new FormData();
      formData.append("variation", variation);
      formData.append("index", index);
      formData.append("product_url", productUrl);
      formData.append("productID", productId);
      const response = await change_image_variation(formData);
      return { file, response };
    };
    setImages((prevImages) => {
      const newImages = [...prevImages];

      newImages[index] = { ...newImages[index], response: "Changing" };
      return newImages;
    });

    await uploadPromises().then((uploadedFile) => {
      setImages((prevImages) => {
        const newImages = prevImages.map((prevImage) => {
          if (prevImage.file.name === uploadedFile.file.name) {
            return { ...prevImage, response: uploadedFile.response };
          }
          return prevImage;
        });
        return newImages;
      });
    });
  };
  const handleProductTypeChange = (e) => {
    const selectedCategory = e.target.value;
    setProductType(selectedCategory);
    if (selectedCategory === "Shirts") {
      setSelectOptions(shirtsOptions);
    } else if (selectedCategory === "Pants") {
      setSelectOptions(pantsOptions);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setConfirmProduct(true);
    const formData = new FormData(e.target);
    formData.set("product_id", productId);
    await add_product(formData).then((res) => {
      if (res.status == "success") {
        alert("Product added successfully");
        router.push("/admin/products");
      } else {
        alert(res.error);
      }
      setConfirmProduct(false);
    });
  };
  return (
    <div className="py-[24px] px-[40px] w-full text-main">
      <div className="flex flex-col gap-[4px] font-semibold">
        <div className="text-[24px]">Add new Product</div>
        <div className="text-[16px]">
          Admin {">"} All products {">"} Add new product
        </div>
      </div>
      <div className="flex gap-[48px]">
        <form
          onSubmit={handleAddProduct}
          className="flex-1 flex flex-col gap-[24px]"
        >
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="name" className="text-[20px] font-semibold">
              Product name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={"Product name here"}
              className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
              onChange={(e) => setProductUrl(createSlug(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="productURL" className="text-[20px] font-semibold">
              Product URL
            </label>
            <input
              readOnly
              type="text"
              id="productURL"
              name="productURL"
              placeholder="This is how the URL for the product will look like"
              className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
              value={productUrl}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="description" className="text-[20px] font-semibold">
              Product description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Product description here"
              className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px] min-h-[42px] max-h-[500px]"
            />
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[20px] font-semibold">
              Product Variations
            </label>
            {variations.map((variation, index) => (
              <div
                key={"variation-" + index}
                className="flex flex-col gap-[8px]"
              >
                <div className="flex items-center gap-[8px]" key={index}>
                  <LucideX
                    size={24}
                    color={variations.length === 1 ? "#E5E5E5" : "#000000"}
                    onClick={() => {
                      if (variations.length === 1) return;
                      const newVariations = variations.filter(
                        (v, i) => i !== index
                      );
                      setVariations(newVariations);
                    }}
                  />
                  <input
                    type="text"
                    name={`variationsNames`}
                    placeholder="Variation name"
                    className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px] h-fit"
                    value={variation.name}
                    onChange={(e) => {
                      const newVariations = variations.map((v, i) =>
                        i === index ? { ...v, name: e.target.value } : v
                      );
                      setVariations(newVariations);
                    }}
                  />
                  <div className="flex flex-col gap-[8px]">
                    {variation.sizes.map((size, indexx) => (
                      <div className="flex items-center gap-[8px]" key={indexx}>
                        <select
                          name={`productType_${format_variation_name(
                            variation.name
                          )}`}
                          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
                          value={productType}
                          onChange={handleProductTypeChange}
                        >
                          <option value="Shirts">Shirts</option>
                          <option value="Pants">Pants</option>
                        </select>
                        <select
                          name={`variationSize_${format_variation_name(
                            variation.name
                          )}`}
                          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
                          value={size.size}
                          onChange={(e) => {
                            const newVariations = variations.map(
                              (variation, i) =>
                                i === index
                                  ? {
                                      ...variation,
                                      sizes: variation.sizes.map(
                                        (sizeItem, sizeIndex) =>
                                          sizeIndex === indexx
                                            ? {
                                                ...sizeItem,
                                                size: e.target.value,
                                              }
                                            : sizeItem
                                      ),
                                    }
                                  : variation
                            );
                            setVariations(newVariations);
                          }}
                        >
                          {selectOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <input
                          name={`variationQuantity_${format_variation_name(
                            variation.name
                          )}`}
                          type="text"
                          placeholder="Variation quantity"
                          className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
                          value={size.quantity}
                          onChange={(e) => {
                            const newVariations = variations.map(
                              (variation, vIndex) =>
                                vIndex === index
                                  ? {
                                      ...variation,
                                      sizes: variation.sizes.map(
                                        (sizeItem, sIndex) =>
                                          sIndex === indexx
                                            ? {
                                                ...sizeItem,
                                                quantity: e.target.value,
                                              }
                                            : sizeItem
                                      ),
                                    }
                                  : variation
                            );
                            setVariations(newVariations);
                          }}
                        />
                        <LucideX
                          size={24}
                          color={
                            variation.sizes.length === 1 ? "#E5E5E5" : "#000000"
                          }
                          onClick={() => {
                            if (variation.sizes.length === 1) return;
                            const newVariations = variations.map(
                              (variation, vIndex) =>
                                vIndex === index
                                  ? {
                                      ...variation,
                                      sizes: variation.sizes.filter(
                                        (sizeItem, sIndex) => sIndex !== indexx
                                      ),
                                    }
                                  : variation
                            );
                            setVariations(newVariations);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="text-[16px] text-main underline cursor-pointer self-end"
                  type="button"
                  onClick={() => {
                    const newVariations = variations.map((v, i) =>
                      i === index
                        ? {
                            ...v,
                            sizes: [
                              ...v.sizes,
                              v.sizes[v.sizes.length - 1] || {
                                size: "",
                                quantity: "",
                              },
                            ],
                          }
                        : v
                    );
                    setVariations(newVariations);
                  }}
                >
                  Add size
                </button>
              </div>
            ))}
            <button
              className="text-[16px] text-main underline cursor-pointer"
              type="button"
              onClick={() => {
                if (variations.length === 0) {
                  setVariations([
                    { name: "", sizes: [{ size: "", quantity: "" }] },
                  ]);
                } else {
                  setVariations((prevVariations) => [
                    ...prevVariations,
                    variations[variations.length - 1],
                  ]);
                }
              }}
            >
              Add variation
            </button>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="price" className="text-[20px] font-semibold">
              Product Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder={"Product price here"}
              className="border-[1px] border-[#E5E5E5] rounded-[4px] px-[16px] py-[8px] text-[16px]"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="description" className="text-[20px] font-semibold">
              Available for sale
            </label>
            <div className="flex items-center gap-[10px]">
              <input
                type="checkbox"
                id="available"
                name="available"
                className="w-[20px] h-[20px]"
              />
              <label htmlFor="available" className="text-[16px]">
                Yes
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-main text-white w-fit px-[16px] py-[8px] disabled:opacity-75 disabled:cursor-not-allowed"
            disabled={
              confirmProduct ||
              images.some(
                (image) =>
                  image.response == "Uploading" || image.response == "Changing"
              )
            }
          >
            Confirm product
          </button>
        </form>
        <div className="flex-1">
          <form
            className="relative min-w-[300px] min-h-[300px] max-w-full "
            encType="multipart/form-data"
          >
            <div className="min-w-[300px] min-h-[300px] w-full max-h-[500px] bg-gray-50 relative">
              <input
                type="file"
                accept="image/*"
                name="file"
                multiple
                className="cursor-pointer w-full h-full absolute top-0 left-0 opacity-0"
                onChange={handleImageChange}
              />
              {imageURL && (
                <img
                  src={imageURL}
                  alt="product"
                  className="min-w-[300px] min-h-[300px] max-w-full max-h-[500px]"
                />
              )}
            </div>
            <div className="flex flex-col gap-[8px] mt-[24px] h-full">
              {images.map((image, index) => (
                <div
                  key={image.file.name}
                  className="flex justify-between items-center px-[16px] py-[8px] bg-gray-50 rounded-[8px] gap-[8px]"
                >
                  <div className="w-[140px] h-[100px] overflow-clip rounded-[8px] border border-gray-50">
                    <img
                      src={URL.createObjectURL(image.file)}
                      alt="product"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="max-w-[200px] overflow-auto hide-scrollbar">
                    {image.file.name}
                  </div>
                  <select
                    name="variation"
                    className="border-[1px] border-main rounded-[4px] px-[16px] py-[8px] text-[16px]"
                    onChange={(e) => {
                      handleVariationChange(image.file, index, e.target.value);
                    }}
                  >
                    {/* {(variations.length === 0 || !variations[0].name) && ( */}
                    <option value="">Select variation</option>
                    {/* )} */}
                    {variations?.map((variation) => {
                      if (!variation.name) return null;
                      return (
                        <option
                          key={variation.name}
                          className="border-[1px] rounded-[4px] px-[16px] py-[8px] text-[16px]"
                          value={variation.name}
                        >
                          {variation.name}
                        </option>
                      );
                    })}
                  </select>
                  <div>{image.response}</div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
